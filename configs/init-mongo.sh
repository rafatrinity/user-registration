#!/bin/bash
source /configs/.env

USERNAME=$DB_USERNAME
PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME

mongosh <<EOF
    use admin
    db.auth("$USERNAME", "$PASSWORD")
    use $DB_NAME
    db.createUser({
        user: "$USERNAME",
        pwd: "$PASSWORD",
        roles: [{ role: "readWrite", db: "$DB_NAME" }]
    })
    db.createCollection("User")
EOF
