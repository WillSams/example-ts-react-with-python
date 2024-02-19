import json

from ariadne import (
    ObjectType,
    load_schema_from_path,
    make_executable_schema,
    snake_case_fallback_resolvers,
)
from ariadne.asgi import GraphQL
from fastapi import APIRouter, Request, Response

import api.utils as utils
from api.models import ApiData
from api.resolvers.mutations import (
    create_reservation_resolver,
    delete_reservation_resolver,
)
from api.resolvers.queries import (
    get_all_reservations_resolver,
    get_all_rooms_resolver,
    get_available_rooms_resolver,
    get_reservation_resolver,
)

query = ObjectType("Query")
query.set_field("getReservation", get_reservation_resolver)
query.set_field("getAllReservations", get_all_reservations_resolver)
query.set_field("getAllRooms", get_all_rooms_resolver)
query.set_field("getAvailableRooms", get_available_rooms_resolver)

mutation = ObjectType("Mutation")
mutation.set_field("createReservation", create_reservation_resolver)
mutation.set_field("deleteReservation", delete_reservation_resolver)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)

graphql_app = GraphQL(schema, debug=utils.is_debug())


class GraphqlRoute:
    def __init__(self):
        self.router = APIRouter()
        self.prefix = f"/{utils.runtime_environment()}/graphql"
        self._setup_routes()

    def _setup_routes(self):
        @self.router.post(self.prefix, tags=["graphql"])
        async def graphql_handler(request: Request) -> ApiData:
            try:
                result = await graphql_app.handle_request(request)
                result = result.body.decode()
                inner_data = json.loads(result).get("data", {})
                response = ApiData(data=inner_data, status=utils.StatusCode.OK)
            except Exception as error:
                messages = str(error)
                utils.log_api_message(__name__, messages)
                data = {"success": False, "errors": messages}
                response = ApiData(data=data, status=utils.StatusCode.BAD_REQUEST)
            return response

        @self.router.get(self.prefix, tags=["playground"])
        async def playground_handler(request: Request) -> Response:
            return await graphql_app.handle_request(request)
