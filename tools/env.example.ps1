$env:ENV = development
$env:NODE_ENV = ${env:ENV}
$env:VITE_ENV = ${env:NODE_ENV}
$env:IS_DEBUG = 1
$env:FRONTEND_SECRET = jwt-s3cr3t
$env:SECRET_KEY = s3cr3t-k3y
$env:REACT_APP_TOKEN_SECRET = ${env:SECRET_KEY}
$env:REFRESH_SECRET_KEY = s3cr3t-k3y
$env:COOKIE_EXPIRATION = 86400

$env:FRONTEND_PORT = 3000

$env:RESERVATION_PORT = 8080
$env:RESERVATION_API = http://localhost:${env:RESERVATION_PORT}/${env:ENV}
$env:VITE_RESERVATION_API = ${env:RESERVATION_API}

$env:PG_CLIENT = postgres
$env:PG_USER = postgres
$env:PG_PASSWD = postgres
$env:PG_HOST = localhost
$env:PG_NAME = hotel_${env:ENV}
$env:PG_PORT = 8081
$env:PG_URL = ${env:PG_CLIENT}://${env:PG_USER}:${env:PG_PASSWD}@${env:PG_HOST}:${env:PG_PORT}/${env:PG_NAME}

