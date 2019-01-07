#! /bin/bash

yarn run build:server
docker build -t murithi/abb:latest .
docker push murithi/abb:latest
ssh root@157.230.18.128 "docker pull murithi/abb:latest && docker tag murithi/abb:latest dokku/abb:latest && dokku tags:deploy abb latest
"
