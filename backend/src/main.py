from datetime import timedelta

from fastapi import Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

import api.utils as utils
from auth import create_access_token, verify_user
from routes import create_app
from routes.about import AboutRoute
from routes.graphql import GraphqlRoute
from settings import ACCESS_TOKEN_EXPIRE_MINUTES

app = create_app(AboutRoute(), GraphqlRoute())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post(f"/{utils.runtime_environment()}/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    username = form_data.username
    password = form_data.password

    if not verify_user(username, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(username, expires_delta)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES,
    }


@app.exception_handler(404)
async def resource_not_found(request, exc) -> JSONResponse:
    return JSONResponse(content={"error": "Not found!"}, status_code=404)


def main() -> None:
    if utils.is_debug():
        utils.setup_file_logger()

    import uvicorn

    host = "localhost"
    port = int(utils.api_port())
    if utils.is_debug():
        uvicorn.run("main:app", host=host, port=port, reload=True)
    else:  # note: file logging occurs when not in debug mode
        uvicorn.run(app, host=host, port=port)

    if utils.is_debug():
        utils.logger_exit_message()


if __name__ == "__main__":
    main()
