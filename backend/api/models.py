import datetime
from typing import Any, Dict

from pydantic import BaseModel

from api import utils


class Room(BaseModel):
    id: str
    num_beds: int
    allow_smoking: bool
    daily_rate: int
    cleaning_fee: int


class Reservation(BaseModel):
    id: int
    room_id: str
    checkin_date: datetime.datetime
    checkout_date: datetime.datetime
    total_charge: int


class ApiData(BaseModel):
    data: Dict[str, Any]
    status: utils.StatusCode
