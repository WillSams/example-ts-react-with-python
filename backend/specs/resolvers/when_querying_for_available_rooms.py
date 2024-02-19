import pytest
from asyncpg import Pool

from api.models import Room
from api.resolvers.queries import get_available_rooms_resolver

from . import MOCK_EXECUTION_CONTEXT


class DescribeAvailableRoomsResolver:
    @pytest.mark.asyncio
    async def should_get_available_rooms_all_available(self, mocker):
        rooms = [
            Room(
                id=f"room_{i}",
                num_beds=i * 2,
                allow_smoking=True if i % 2 == 0 else False,
                daily_rate=int(i * 140),
                cleaning_fee=int(i * 20),
            )
            for i in range(1, 10)
        ]

        expected_id = range(1, 10)
        room_to_check = [room for room in rooms if room.id == expected_id]

        mock_pool = mocker.Mock(spec=Pool)
        mocker.patch("asyncpg.create_pool", return_value=mock_pool)
        mocker.patch(
            "api.resolvers.mutations.DbSession",
            mocker.AsyncMock(return_value=mock_pool),
        )
        mocker.patch(
            "api.resolvers.data.fetch_all_rows", mocker.AsyncMock(return_value=rooms)
        )
        mocker.patch(
            "api.resolvers.data.fetch_room",
            mocker.AsyncMock(return_value=room_to_check),
        )

        # room is available when 0 is returned in is_room_available
        mock_pool.fetchval = mocker.AsyncMock(return_value=0)
        mock_pool.fetch = mocker.AsyncMock(return_value=rooms)

        input_data = {
            "checkin_date": "2023-01-10",
            "checkout_date": "2023-01-15",
        }

        result = await get_available_rooms_resolver(
            None, MOCK_EXECUTION_CONTEXT, input_data
        )

        assert result["success"] is True
