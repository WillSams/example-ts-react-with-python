from datetime import datetime

from api.resolvers.constants import INVALID_DATE_RANGE


def check_date_validity(checkin_date: datetime, checkout_date: datetime) -> None:
    if checkout_date <= checkin_date:
        raise ValueError(INVALID_DATE_RANGE)


def calculate_total_charge(
    daily_rate: int, checkin_date: datetime, checkout_date: datetime
) -> int:
    calculated_days = (checkout_date - checkin_date).days
    return daily_rate * calculated_days
