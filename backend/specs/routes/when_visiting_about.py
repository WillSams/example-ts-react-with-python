import json

import pytest

from routes import create_app
from routes.about import AboutRoute


class DescribeAboutRoutes:
    @pytest.fixture(scope="module")
    def client(self):
        from fastapi.testclient import TestClient

        app = create_app(AboutRoute())
        with TestClient(app=app) as client:
            yield client

    def should_return_about_component(self, client):
        response = client.get("/test/about")
        assert response.status_code == 200
        data = json.loads(response.content).get("data", {})
        expected_data = "Acme Hotel Reservation - Graphql API"
        assert data["name"] == expected_data
