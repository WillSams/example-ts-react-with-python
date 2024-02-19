export ENV=development
export NODE_ENV=${ENV}
export VITE_ENV=${NODE_ENV}
export IS_DEBUG=1
export FRONTEND_SECRET=jwt-s3cr3t
export SECRET_KEY=s3cr3t-k3y
export REACT_APP_TOKEN_SECRET=${SECRET_KEY}
export REFRESH_SECRET_KEY=s3cr3t-k3y
export COOKIE_EXPIRATION=86400

export FRONTEND_PORT=3000

export RESERVATION_PORT=8080
export RESERVATION_API=http://localhost:${RESERVATION_PORT}/${ENV}
export VITE_RESERVATION_API=${RESERVATION_API}

export PG_CLIENT=postgres
export PG_USER=postgres
export PG_PASSWD=postgres
export PG_HOST=localhost
export PG_NAME=hotel_$ENV
export PG_PORT=8081
export PG_URL=${PG_CLIENT}://${PG_USER}:${PG_PASSWD}@${PG_HOST}:${PG_PORT}/${PG_NAME}
