#!/bin/bash
set -e
flake8 src/ specs/
find "$(pwd)/src" -type f -name "\"*.py\"" ! -name "\"*test_*\"" \
    -exec python -m mypy {} +
