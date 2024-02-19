from datetime import timedelta

import pytest
from jose import jwt

from auth import create_access_token, create_refresh_token
from settings import ALGORITHM, REFRESH_SECRET_KEY, SECRET_KEY


class DescribeAuthorization:
    @pytest.fixture
    def subject(self):
        return "example-user"

    @pytest.fixture
    def expires_delta(self):
        return timedelta(days=1)

    def should_create_access_token(self, subject, expires_delta):
        generated_token = create_access_token(subject, expires_delta)
        assert generated_token is not None

        decoded_token = jwt.decode(generated_token, SECRET_KEY, algorithms=[ALGORITHM])
        assert decoded_token["sub"] == subject

    def should_create_refresh_token(self, subject, expires_delta):
        generated_token = create_refresh_token(subject, expires_delta)
        assert generated_token is not None

        decoded_token = jwt.decode(
            generated_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM]
        )
        assert decoded_token["sub"] == subject
