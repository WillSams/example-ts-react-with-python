from datetime import datetime

import pytest
from asyncpg import Pool

from api.models import Reservation
from api.resolvers.queries import get_all_reservations_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeAllReservationsResolver:
    @pytest.mark.asyncio
    async def should_return_all_reservations(self, mocker):
        reservations = [
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

        mock_pool = mocker.AsyncMock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.queries.DbSession", mocker.AsyncMock(return_value=mock_pool)
        )
        mock_pool.fetch = mocker.AsyncMock(return_value=reservations)

        result = await get_all_reservations_resolver(None, MOCK_EXECUTION_CONTEXT)

        assert "reservations" in result
        assert len(result["reservations"]) == 2
        assert result["reservations"] == reservations
