# Case Review

## Contents

1. [Getting Started](https://github.com/shabanzo/auction/blob/main/README.md#getting-started)
2. [Testing](https://github.com/shabanzo/auction/blob/main/README.md#testing)
   - [Test Category](https://github.com/shabanzo/auction/tree/main#test-category)
3. [Technical Documentation](https://miro.com/app/board/uXjVNVK10r4=/?share_link_id=637638284788)

## Getting Started

### Using Docker

1. Make sure you have Docker installed on your machine.
2. Run the backend application inside `api` directory using:

```
docker-compose up -d app
```

3. Build the client image, inside `client` directory using:

```
docker build -t client .
```

4. Run the client application, inside `client` directory using:

```
docker run --name client -p 3000:3000 client
```

## Testing

### Using Docker

#### Run tests for backend

1. Make sure you have Docker installed on your machine and the container already running.
2. Go inside `api` directory and run the container with:

```
docker exec -it app  sh
```

3. Run tests with:

```
npm test
```
