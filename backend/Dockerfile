# pull official base image
FROM python:3.11.1-slim

# set work directory
WORKDIR /usr/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# copy requirements file
COPY ./requirements.txt /usr/backend/requirements.txt

# install dependencies
# RUN set -eux \
#     && apk add --no-cache --virtual .build-deps build-base \
#     libressl-dev libffi-dev gcc musl-dev python3-dev \
#     postgresql-dev \
#     && pip install --upgrade pip setuptools wheel \
#     && pip install -r /usr/server/requirements.txt \
#     && rm -rf /root/.cache/pip
RUN pip install -r requirements.txt

# copy project
COPY . /usr/backend/