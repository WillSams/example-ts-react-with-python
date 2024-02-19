from fastapi import APIRouter

import api.utils as utils
from api.models import ApiData
from settings import API_NAME


class AboutRoute:
    def __init__(self):
        self.router = APIRouter()
        self.prefix = f"/{utils.runtime_environment()}/about"
        self._setup_routes()

    def _setup_routes(self):
        @self.router.get(self.prefix, tags=["about"])
        async def about_handler() -> ApiData:
            try:
                desc = """This is a GraphQL API that allows you to create and
                list reservations as well as the ability to list available rooms
                for a given date range."""
                data = {"name": f"{API_NAME}", "description": desc}
                response = ApiData(data=data, status=utils.StatusCode.OK)
            except Exception as error:
                messages = str(error)
                utils.log_api_message(__name__, messages)
                data = {"success": False, "errors": messages}
                response = ApiData(data=data, status=utils.StatusCode.BAD_REQUEST)
            return response
