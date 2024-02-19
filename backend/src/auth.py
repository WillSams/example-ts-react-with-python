from datetime import datetime, timedelta

from jose import jwt

from settings import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ALGORITHM,
    REFRESH_SECRET_KEY,
    SECRET_KEY,
)


def create_token(subject: str, secret_key: str, expires_delta: timedelta) -> str:
    if expires_delta is not None:
        expires_at = datetime.utcnow() + expires_delta
    else:
        expires_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires_at, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, secret_key, ALGORITHM)
    return encoded_jwt


def create_access_token(subject: str, expires_delta: timedelta) -> str:
    return create_token(subject, str(SECRET_KEY), expires_delta)


def create_refresh_token(subject: str, expires_delta: timedelta) -> str:
    return create_token(subject, str(REFRESH_SECRET_KEY), expires_delta)


def verify_user(username: str, password: str):
    # for this example application, we are just going to hard-code this
    return username == "example-user" and password == "example-user"
