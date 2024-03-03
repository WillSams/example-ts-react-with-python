from os import getenv

API_NAME = "Acme Hotel Reservation - Graphql API"
API_PORT = getenv("RESERVATION_PORT") or 80
ENV = getenv("ENV") or "development"

DB_HOST = getenv("PG_HOST") or "localhost"
DB_PORT = getenv("PG_PORT") or 5432
DB_USER = getenv("PG_USER") or "postgres"
DB_PASSWD = getenv("PG_PASSWD") or getenv("password") or "postgres"
DB_NAME = getenv("PG_NAME") or f"hotel_db_${ENV}"
DB_URL = (
    getenv("PG_URL")
    or f"postgresql://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
)

IS_DEBUG = bool(int(getenv("IS_DEBUG", "0"))) or False

TOKEN_EXPIRATION_IN_MINUTES = 30
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day
SECRET_KEY = getenv("SECRET_KEY")
REFRESH_SECRET_KEY = getenv("REFRESH_SECRET_KEY")
