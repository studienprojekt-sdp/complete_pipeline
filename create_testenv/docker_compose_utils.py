import os

from blueprint_db import DOCKER_COMPOSE_BLUEPRINTS
from dependency_db import DOCKER_COMPOSE_DEPENDENCIES

# not using a yaml-library for creating the docker-compose.yml file because for some reason
# it was more difficult to get the wanted result with these

def generate_docker_compose(updated_service: str) -> None:
    """this function creates the docker-compose so that the passed service can be tested
    it looks through the (mocked) DBs and selects the necessary images for creating the testing environment"""

    # collecting the necessary SERVICES
    services_to_be_started = [current_service := updated_service]

    while DOCKER_COMPOSE_DEPENDENCIES[current_service]:
        services_to_be_started.extend(DOCKER_COMPOSE_DEPENDENCIES[current_service])
        current_service = DOCKER_COMPOSE_DEPENDENCIES[current_service][0]

    # collecting the necessary TESTSERVICES
    testservices_to_be_started = [current_testservice := updated_service + "_test"]

    for x in DOCKER_COMPOSE_DEPENDENCIES.values():
        if x == current_testservice:
            testservices_to_be_started.extend(x.key + "_test")

    # write the docker-compose.yml
    with open(r"create_testenv/docker-compose.yml", 'w') as f:
        f.write(DOCKER_COMPOSE_BLUEPRINTS["version"])
        f.write(DOCKER_COMPOSE_BLUEPRINTS["network"])
        f.write(DOCKER_COMPOSE_BLUEPRINTS["services"])
        for key in DOCKER_COMPOSE_BLUEPRINTS:
            if key in services_to_be_started or key in testservices_to_be_started:
                f.write(DOCKER_COMPOSE_BLUEPRINTS[key])
    

def execute_docker_compose() -> None:
    """this function simply executes docker-compose up"""
    
    os.chdir(r"C:\Users\Jan\Dropbox\Studium\current\Studienprojekt\testumgebung\create_testenv")
    os.system("docker-compose up")
