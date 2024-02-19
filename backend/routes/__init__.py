from fastapi import APIRouter, FastAPI


def create_app(*routes):
    app = FastAPI()
    routers = APIRouter()
    for route in routes:
        routers.include_router(route.router)

    app.include_router(routers)
    return app
