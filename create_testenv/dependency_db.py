# this mocks a (e.g. graph-based) DB for storing dependencies between microservices

# DEPENDENCIES

DOCKER_COMPOSE_DEPENDENCIES = {
    "service_1": ["service_2"],
    "service_2": ["service_3"],
    "service_3": []
}
