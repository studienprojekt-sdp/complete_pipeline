import os
import requests

from blueprint_db import DOCKER_COMPOSE_BLUEPRINTS
from dependency_db import DOCKER_COMPOSE_DEPENDENCIES

# not using a yaml-library for creating the docker-compose.yml file because for some reason
# it was more difficult to get the wanted result with these

# i refactored this without ever testing it. i hope this still works.

def collect_dependencies_from_db(updated_service: str) -> list:
    """this function collects the names of all services that are dependant on the passed service
    and the ones which the passed service depends on"""
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

    return services_to_be_started + testservices_to_be_started
    

def write_docker_compose(service_list: list) -> None:
    """this function writes the docker-compose.yml file with the passed list of services
    and the blueprint DB"""
    # write the docker-compose.yml
    with open(r"create_testenv/docker-compose.yml", 'w') as f:
        f.write(DOCKER_COMPOSE_BLUEPRINTS["version"])
        f.write(DOCKER_COMPOSE_BLUEPRINTS["network"])
        f.write(DOCKER_COMPOSE_BLUEPRINTS["services"])
        f.write(DOCKER_COMPOSE_BLUEPRINTS["external_access_test"])
        for key in DOCKER_COMPOSE_BLUEPRINTS:
            if key in service_list:
                f.write(DOCKER_COMPOSE_BLUEPRINTS[key])


def generate_docker_compose(updated_service: str) -> None:
    """this function creates the docker-compose so that the passed service can be tested"""
    service_list = collect_dependencies_from_db(updated_service)
    write_docker_compose(service_list)


def execute_docker_compose() -> None:
    """this function simply executes docker-compose up"""
    create_testenv_dir = "" # THE PATH TO /CREATE_TESTENV/ DIR HAS TO BE INSERTED HERE
    os.chdir(create_testenv_dir)
    os.system("docker-compose up")


def send_package_to_gotify(url: str, token: str, message: str):
    resp = requests.post('http://' + url + '/message?token=' + token, json={
    "message": message,
    })

    return resp
