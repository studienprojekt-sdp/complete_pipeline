import os
import requests
from dotenv import load_dotenv

# imports were not working correctly for some reason, so i had to copy this here...
def send_package_to_gotify(url: str, token: str, message: str):
    resp = requests.post('http://' + url + '/message?token=' + token, json={
    "message": message,
    })

    return resp

if __name__ == "__main__":
    load_dotenv()
    send_package_to_gotify(os.environ.get("GOTIFY_URL"), os.environ.get("GOTIFY_APP_TOKEN"), "Tests for external_access_testservice were successful!")
