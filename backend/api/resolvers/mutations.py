from typing import Any, Dict, cast

import api.utils as utils
from api import DbSession
from api.helpers import check_date_validity
from api.resolvers.data import create_reservation, delete_reservation


async def create_reservation_resolver(obj, info, input: dict) -> Dict[str, Any]:
    db = await DbSession()
    try:
        room_id = cast(str, input.get("room_id"))
        checkin_date = utils.convert_to_local_date_from_str(
            str(input.get("checkin_date"))
        )
        checkout_date = utils.convert_to_local_date_from_str(
            str(input.get("checkout_date"))
        )

        check_date_validity(checkin_date, checkout_date)

        result = await create_reservation(db, room_id, checkin_date, checkout_date)
        return result
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()


async def delete_reservation_resolver(obj, info, reservationId: int) -> Dict[str, Any]:
    db = await DbSession()
    try:
        result = await delete_reservation(db, reservationId)
        return result
    except ValueError as error:
        utils.log_api_message(__name__, str(error))
        return {"success": False, "errors": [str(error)]}
    except Exception as e:
        error = f"Unexpected error: {str(e)}"
        utils.log_api_message(__name__, f"Unexpected error: {error}")
        return {"success": False, "errors": [error]}
    finally:
        await db.close()
