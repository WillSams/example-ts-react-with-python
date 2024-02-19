export ENV=test
export PYTHONDONTWRITEBYTECODE=1

find . -name "__pycache__" -exec rm -r {} +
python -m pytest 
