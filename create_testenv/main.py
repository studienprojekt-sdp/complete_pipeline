import websocket
import rel
import json
import os
from dotenv import load_dotenv

from docker_compose_utils import execute_docker_compose, generate_docker_compose

rel.safe_read()

def on_message(ws, message):
    msg = json.loads(message)["message"]
    if "Found new" in msg:
        index = msg.find("Found new ") + len("Found new ")
        image_name = msg[index:].split(" ")[0].split(":")[0].split(r"/")[1] # extracting the service name in a very pretty manner
        print("imagename:" + image_name)
        generate_docker_compose(image_name) # creating the docker-compose 
        execute_docker_compose() # executing it

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Listening to Gotify's websocket for updates from watchtower")

if __name__ == "__main__":
    # websocket.enableTrace(True)
    load_dotenv()
    gotify_client_token = os.environ.get("GOTIFY_CLIENT_TOKEN")
    gotify_url = os.environ.get("GOTIFY_URL")
    ws = websocket.WebSocketApp(r"ws://" + gotify_url + r"/stream?token=" + gotify_client_token,
                              on_open=on_open,
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever(dispatcher=rel)  # Set dispatcher to automatic reconnection
    rel.signal(2, rel.abort)  # Keyboard Interrupt
    rel.dispatch()
