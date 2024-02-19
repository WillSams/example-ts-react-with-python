from datetime import datetime

import pytest
from asyncpg import Pool

from api.models import Reservation
from api.resolvers.queries import get_reservation_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeGetReservationResolver:
    @pytest.mark.asyncio
    async def should_return_reservation_when_queried_by_id(self, mocker):
        reservations = [
            Reservation(
                id=i,
                room_id=f"room_{i}",
                checkin_date=datetime(2023, 1, 1, 5, 0),
                checkout_date=datetime(2023, 1, 1, 5, 0),
                total_charge=i * 140,
            )
            for i in range(1, 10)
        ]

        expected_id = 4
        expected_reservation = [
            reservation for reservation in reservations if reservation.id == expected_id
        ]

        mock_pool = mocker.AsyncMock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.queries.DbSession", mocker.AsyncMock(return_value=mock_pool)
        )
        mock_pool.fetch = mocker.AsyncMock(return_value=expected_reservation)

        result = await get_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, id=expected_id
        )

        assert "reservation" in result
        assert len(result["reservation"]) == 1
        assert result["reservation"] == expected_reservation
