#!/bin/sh
set -e

echo "Waiting for RabbitMQ...."
./wait-for-it.sh rabbitmq:5672

echo "Waiting for MongoDB...."
./wait-for-it.sh db:27017

echo "Migrating DB..."
npm run db:down
npm run db:up

echo "Server running..."
npm run start

"$@"
