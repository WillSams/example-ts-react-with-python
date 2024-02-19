from datetime import datetime

import pytest
from asyncpg import Pool

from api.models import Reservation
from api.resolvers.mutations import create_reservation_resolver
from api.utils import convert_to_local_date_from_str

from . import MOCK_EXECUTION_CONTEXT


class DescribeCreateReservationsResolver:
    @pytest.mark.asyncio
    async def should_create_reservation_if_room_available(self, mocker):
        input_data = {
            "room_id": "room_3",
            "checkin_date": "2099-01-10",
            "checkout_date": "2099-01-15",
        }

        original_reservations = [
            Reservation(
                id=1,
                room_id="room_1",
                checkin_date=datetime(2023, 1, 1, 5, 0),
                checkout_date=datetime(2023, 1, 1, 5, 0),
                total_charge=100,
            ),
            Reservation(
                id=2,
                room_id="room_2",
                checkin_date=datetime(2023, 1, 1, 5, 0),
                checkout_date=datetime(2023, 1, 1, 5, 0),
                total_charge=200,
            ),
        ]

        expected_reservations = [
            original_reservations[0],
            original_reservations[1],
            Reservation(
                id=3,
                room_id=input_data["room_id"],
                checkin_date=convert_to_local_date_from_str(input_data["checkin_date"]),
                checkout_date=convert_to_local_date_from_str(
                    input_data["checkout_date"]
                ),
                total_charge=500,
            ),
        ]

        mock_pool = mocker.Mock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )
        mocker.patch(
            "api.resolvers.data.is_room_available", return_value={"success": True}
        )
        mocker.patch("api.resolvers.data.fetch_room", return_value=mocker.AsyncMock())
        mock_pool.fetch = mocker.AsyncMock(return_value=expected_reservations)

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is True
        assert len(result["reservations"]) == len(original_reservations) + 1
        assert result["reservations"] == expected_reservations

    @pytest.mark.asyncio
    async def should_not_create_reservation_when_room_not_available(self, mocker):
        mock_pool = mocker.Mock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )
        mocker.patch("api.resolvers.data.fetch_room", return_value=mocker.AsyncMock())
        mock_pool.fetchval = mocker.AsyncMock(
            return_value=1
        )  # there is an existing room for dates in the input data
        mock_pool.fetch = mocker.AsyncMock(return_value=[])

        input_data = {
            "room_id": "room_1",
            "checkin_date": "2099-01-10",
            "checkout_date": "2099-01-15",
        }

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is False
        assert "errors" in result
        assert "Dates overlap with an existing reservations." in result["errors"]

    @pytest.mark.asyncio
    async def should_not_create_reservation_when_checkin_date_is_in_past(self, mocker):
        mock_pool = mocker.Mock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )

        input_data = {
            "room_id": "room_1",
            "checkin_date": "1985-10-15",
            "checkout_date": "2099-01-15",
        }

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is False
        assert "errors" in result
        assert "Check-in date must be greater than today." in result["errors"]

    @pytest.mark.asyncio
    async def should_not_create_reservation_when_checkout_date_is_before_checkin_date(
        self, mocker
    ):
        mock_pool = mocker.Mock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )

        input_data = {
            "room_id": "room_1",
            "checkin_date": "2099-12-31",
            "checkout_date": "2099-01-15",
        }

        result = await create_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is False
        assert "errors" in result
        assert "Check-out date must be greater than check-in date." in result["errors"]
