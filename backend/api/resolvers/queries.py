from typing import Any, Dict

import api.utils as utils
from api import DbSession
from api.models import Reservation, Room
from api.resolvers.data import fetch_all_rows, fetch_available_rooms, fetch_reservation


async def get_reservation_resolver(obj, info, id) -> Dict[str, Any]:
    try:
        db = await DbSession()

        result = await fetch_reservation(db, id)
        return result
    except ValueError as error:
        message = f"Error retrieving reservation: {str(error)}"
        utils.log_api_message(__name__, message)
        return {
            "success": False,
            "errors": [message],
        }
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()


async def get_all_reservations_resolver(obj, info) -> Dict[str, Any]:
    db = await DbSession()
    try:
        return await fetch_all_rows(db, Reservation)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()


async def get_all_rooms_resolver(obj, info) -> Dict[str, Any]:
    db = await DbSession()
    try:
        return await fetch_all_rows(db, Room)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()


async def get_available_rooms_resolver(obj, info, input: dict) -> Dict[str, Any]:
    db = await DbSession()
    try:
        checkin_date = utils.convert_to_local_date_from_str(
            str(input.get("checkin_date"))
        )
        checkout_date = utils.convert_to_local_date_from_str(
            str(input.get("checkout_date"))
        )

        return await fetch_available_rooms(db, checkin_date, checkout_date)
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()
