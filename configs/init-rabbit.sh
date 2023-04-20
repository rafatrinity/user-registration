#!/bin/bash
source ./keys/trial.env
rabbitmq-plugins enable rabbitmq_management
rabbitmqctl add_user ${RABBITMQ_USER} ${RABBITMQ_PASS}
rabbitmqctl set_user_tags ${RABBITMQ_USER} administrator
rabbitmqctl set_permissions -p / ${RABBITMQ_USER} ".*" ".*" ".*"
exec rabbitmq-server
