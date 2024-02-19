FROM python:3.8.3

ARG RESERVATION_PORT=80
ARG ENV
ARG PG_URL
ARG IS_DEBUG
ARG SECRET_KEY
ARG REFRESH_SECRET_KEY

ENV RESERVATION_PORT=${RESERVATION_PORT}
ENV ENV=${ENV}
ENV PG_URL=${PG_URL}
ENV IS_DEBUG=${IS_DEBUG}
ENV SECRET_KEY=${SECRET_KEY}
ENV REFRESH_SECRET_KEY=${REFRESH_SECRET_KEY}

WORKDIR /app
COPY ./src/ /app/
COPY ./schema.graphql /app/
RUN mkdir logs
COPY ./requirements-docker.txt ./requirements.txt
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

EXPOSE ${RESERVATION_PORT}
CMD ["python", "main.py"]
