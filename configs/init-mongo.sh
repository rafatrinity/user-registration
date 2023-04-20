#!/bin/bash
source ./keys/trial.env
mongo -u $DB_USERNAME -p $DB_PASSWORD --eval "db = db.getSiblingDB('$DB_NAME'); db.createUser({user: '$DB_USERNAME', pwd: '$DB_PASSWORD', roles: [{ role: 'dbAdmin', db: '$DB_NAME' }]});"