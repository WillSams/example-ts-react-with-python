import asyncpg
from asyncpg.pool import Pool

from api.utils import log_api_message
from settings import DB_URL, ENV


class DummyPool:
    async def close(self):
        pass

    async def fetch(self, *args, **kwargs):
        pass

    async def fetchval(self, *args, **kwargs):
        pass


async def DbSession() -> Pool:
    if ENV == "test":
        # see the a mock pool implemented in specs/resolvers/__init__.py
        return DummyPool()

    try:
        pool = await asyncpg.create_pool(DB_URL)
        return pool
    except Exception as e:
        message = f"Error initializing database connection: {e}"
        log_api_message(__name__, message)
        raise
