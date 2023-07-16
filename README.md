# bitespeed

## Prerequisite

- `npm i`

## Docker

- Starting the application & mysql in a containerized environment is as simple as running,

```shell
docker-compose up
```

- This will start mysql and the bitspeed service, waits for mysql container to be healthy and run initial database migrations.

## Testing

- Once the server is started either run the predefined curl requests from `curl.sh` or manually hit the `/identify` endpoint via Postman.
- Some unit tests have been written which makes use of Fake in-memory database to test `identifyController` by matching responses stored under `tests/internals/*.json`.

```
npm test
```

## Local Development

- First and foremost is to run mysql as a docker container locally & wait for contiainer to become healthy/active/running.

```shell
docker pull mysql:latest
docker run --name local-mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:latest
```

- Run the server. This will also run some initial database migrations.

```
chmod +x run.sh
./run.sh
```
