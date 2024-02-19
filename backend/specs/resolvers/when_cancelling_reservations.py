from datetime import datetime

import pytest
from asyncpg import Pool

from api.models import Reservation
from api.resolvers.mutations import delete_reservation_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeDeleteReservationResolver:
    def find_by_id(self, reservation_id):
        return [
            reservation
            for reservation in self.reservations
            if reservation.id != reservation_id
        ]

    @pytest.mark.asyncio
    async def should_delete_existing_reservation(self, mocker):
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

        existing_reservation_id = 1
        expected_reservations = [
            reservation
            for reservation in original_reservations
            if reservation.id != existing_reservation_id
        ]

        mock_pool = mocker.AsyncMock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )
        mock_pool.fetch = mocker.AsyncMock(return_value=expected_reservations)

        result = await delete_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, reservationId=existing_reservation_id
        )

        assert result["success"] is True
        assert len(result["reservations"]) == len(original_reservations) - 1
        assert result["reservations"] == expected_reservations

    @pytest.mark.asyncio
    async def test_should_give_reservation_not_found(self, mocker):
        result = await delete_reservation_resolver(
            None, MOCK_EXECUTION_CONTEXT, reservationId=999
        )

        assert result["success"] is False
        assert "Reservation with id of 999 not found" in result["errors"]
