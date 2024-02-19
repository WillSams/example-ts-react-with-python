import os
import sys

env_value = os.getenv("ENV")
if env_value != "test":
    raise ValueError(
        """"Environment variable 'ENV' must
                     be set to 'test' for testing."""
    )


# Add the project root directory to the Python path
relative_path = os.path.join(os.path.dirname(__file__), "../src")
project_root = os.path.abspath(relative_path)
sys.path.insert(0, project_root)
