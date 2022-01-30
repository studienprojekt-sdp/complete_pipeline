works only locally right now, ports would need to be changed otherwise
also cannot return time based on IP yet

## to test locally

run the container with published ports

`docker run -dit --publish 3000:3000 --name <CONTAINER_NAME> <IMAGE_NAME>`

then enter in your browser's address bar

`http://localhost:3000/api/timezone/tz=<TIMEZONE_NAME>`
