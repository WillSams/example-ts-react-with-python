from datetime import datetime
from typing import Any, Dict

import api.utils as utils
from api.helpers import calculate_total_charge
from api.models import Reservation, Room
from api.resolvers.constants import INVALID_DATE_CHECK_IN, INVALID_DATE_OVERLAP


async def create_reservation(
    db, room_id: str, checkin_date: datetime, checkout_date: datetime
) -> Dict[str, Any]:
    available = await is_room_available(
        db, room_id=room_id, checkin_date=checkin_date, checkout_date=checkout_date
    )
    if not available["success"]:
        for message in available["errors"]:
            utils.log_api_message(__name__, message)
        return {"success": False, "errors": available["errors"]}

    room_result = await fetch_room(db, room_id)
    room = room_result["room"][0]
    daily_rate = room.daily_rate
    total_charge = calculate_total_charge(daily_rate, checkin_date, checkout_date)

    reservation_insert_query = """
            INSERT INTO reservations
                (room_id, checkin_date, checkout_date, total_charge)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        """
    await db.fetchval(
        reservation_insert_query, room_id, checkin_date, checkout_date, total_charge
    )
    reservations = await fetch_all_rows(db, Reservation)
    return reservations


async def delete_reservation(db, reservation_id: str) -> Dict[str, Any]:
    reservation = await fetch_reservation(db, reservation_id)
    if reservation:
        await db.execute("DELETE FROM reservations WHERE id = $1", reservation_id)
        return await fetch_all_rows(db, Reservation)
    else:
        errors = ["Reservation not found"]
        return {"success": False, "errors": errors, "reservations": None}


async def is_room_available(
    db, room_id: str, checkin_date: datetime, checkout_date: datetime
) -> Dict[str, Any]:
    try:
        if checkin_date < datetime.now():
            message: str = INVALID_DATE_CHECK_IN
            utils.log_api_message(__name__, message)
            return {"success": False, "errors": [message]}

        query = """
            SELECT COUNT(*) FROM reservations
            WHERE room_id = $1
            AND (
                (checkin_date >= $2 AND checkin_date < $3)
                OR (checkout_date > $2 AND checkout_date <= $3)
                OR (checkin_date <= $2 AND checkout_date >= $3)
            )
        """
        count = await db.fetchval(query, room_id, checkin_date, checkout_date)

        if count == 0:
            return {"success": True, "errors": None}
        else:
            return {"success": False, "errors": [INVALID_DATE_OVERLAP]}

    except Exception as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}


async def fetch_all_rows(db, entity_type) -> Dict[str, Any]:
    table_name = entity_type.__name__.lower() + "s"
    query = f"SELECT * FROM {table_name}"
    rows = await db.fetch(query)
    if rows:
        entities = [entity_type(**dict(row)) for row in rows]
        return {"success": True, f"{table_name}": entities}
    else:
        raise ValueError("No reserved rooms found")


async def fetch_by_id(db, entity_type, id) -> Dict[str, Any]:
    table_name = entity_type.__name__.lower() + "s"
    query = f"SELECT * FROM {table_name} WHERE id = $1"
    rows = await db.fetch(query, id)
    if rows:
        entities = [entity_type(**dict(row)) for row in rows]
        return {"success": True, f"{entity_type.__name__.lower()}": entities}
    else:
        return {"success": False, f"{entity_type.__name__.lower()}": None}


async def fetch_available_rooms(db, checkin_date, checkout_date) -> Dict[str, Any]:
    rooms = await fetch_all_rows(db, Room)
    available_rooms = [
        room
        for room in rooms
        if await is_room_available(db, room.id, checkin_date, checkout_date)
    ]
    return {"success": True, "rooms": available_rooms}


async def fetch_room(db, room_id: str) -> Room:
    result = await fetch_by_id(db, Room, id=room_id)
    if result["success"]:
        return result
    else:
        raise ValueError(f"Room with id {room_id} not found")


async def fetch_reservation(db, reservation_id: id):
    result = await fetch_by_id(db, Reservation, id=reservation_id)
    if result["success"]:
        return result
    else:
        raise ValueError(f"Reservation with id of {reservation_id} not found")
