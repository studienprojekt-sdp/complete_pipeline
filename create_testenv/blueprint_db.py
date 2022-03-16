# this mocks a DB that stores the code that is then used in the docker-compose.yaml

DOCKER_COMPOSE_BLUEPRINTS = {
"version" : "version: '3.7'",

"network" : "\nnetworks:\n  microservice-network:\n    driver: bridge",

"services" : "\nservices:",

"service_1" : "\n  service_1:\n    image: jnhck/service_1\n    networks:\n      - microservice-network",

"service_2" : "\n  service_2:\n    image: jnhck/service_2\n    networks:\n      - microservice-network",

"service_3" : "\n  service_3:\n    image: jnhck/service_3\n    networks:\n      - microservice-network",

"service_1_test" : "\n  service_1_test:\n    image: jnhck/service_1\n    command: sh -cx 'npm test'\n    networks:\n      - microservice-network",

"service_2_test" : "\n  service_2_test:\n    image: jnhck/service_2\n    command: sh -cx 'npm test'\n    networks:\n      - microservice-network",

"external_access_test" : "\n  external_access_test:\n    image: jnhck/external_access_test\n    command: sh -cx 'npm test'\n"
}
