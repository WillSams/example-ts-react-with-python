import inspect
import logging
from datetime import datetime, timezone
from enum import Enum
from typing import cast

from fastapi import status

from settings import API_NAME, API_PORT, DB_URL, ENV, IS_DEBUG

Logger = logging.getLogger()


def api_port() -> int:
    return cast(int, API_PORT)


def is_debug() -> bool:
    return cast(bool, IS_DEBUG)


def runtime_environment() -> str:
    return str(ENV)


def database_host() -> str:
    return str(DB_URL)


def convert_to_local_date(dt_utc: datetime) -> datetime:
    return dt_utc.astimezone(timezone.utc).replace(tzinfo=None)


def convert_to_local_date_from_str(date_str: str) -> datetime:
    dt_utc = datetime.strptime(date_str, "%Y-%m-%d")
    return dt_utc.astimezone(timezone.utc).replace(tzinfo=None)


def get_calling_function_name() -> str:
    frame = inspect.currentframe()

    calling_frame = frame.f_back if frame is not None else None
    return calling_frame.f_code.co_name if calling_frame is not None else ""


def setup_file_logger() -> None:
    current_date = datetime.now().strftime("%Y%m%d")
    log_file = f"logs/{current_date}.log"
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
    )

    start_message = f"🚀 {API_NAME} ready at localhost:{API_PORT}/{ENV}/graphql"
    Logger.info(start_message)


def log_api_message(module_name: str, message: str) -> None:
    caller = get_calling_function_name()
    Logger.info(f"{module_name}.{caller} message(s):\n\t{message}")


def logger_exit_message() -> None:
    Logger.info(f"🛑 {API_NAME} stopped!")


class StatusCode(str, Enum):
    OK = status.HTTP_200_OK
    NOT_FOUND = status.HTTP_404_NOT_FOUND
    BAD_REQUEST = status.HTTP_400_BAD_REQUEST
