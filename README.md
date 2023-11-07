# Case Review

## Contents

1. [Getting Started](https://github.com/shabanzo/case-review/blob/master/README.md#getting-started)
2. [Testing](https://github.com/shabanzo/case-review/blob/master/README.md#testing)
3. [Technical Documentation](https://miro.com/app/board/uXjVNVK10r4=/?share_link_id=637638284788)

## Getting Started

### Using Docker

1. Make sure you have Docker installed on your machine.
2. Set `.env` file
3. Run the backend application inside `api` directory using:

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

5. You can also run the client application by start the npm if you've installed the npm before.
6. For generating dummy you can use mongo-express:

   a. Run mongo-express
   ```
     docker-compose up -d mongo-express
   ```
   b. Go to to `http://localhost:28081/db/case_review_db` and enter the basic auth that you defined in `.env`
8. Or via the API here in the Postman: [Postman](https://api.postman.com/collections/1759219-310c6019-1a15-4177-9ad6-8e805f3ce279?access_key=PMAT-01HEKNHWGH1HK1JD598NTYFZC4) or send manually:

   a. Login first (Change the value based on your registered user):
   ```
     POST http://localhost:8000/api/auth/login
     {
       "email": "daniel@example.com",
       "password": "password123"
     }
   ```
   b. Then create cases (Change the value as you like):
   ```
     POST http://localhost:8000/api/caseReviews
   {
      "imageUrl": "https://repository-images.githubusercontent.com/184535638/312a3c80-6cdb-11e9-821f-cae5c9f99a2c",
      "alert": "Intruder",
      "priority": "high",
      "description": "Someone entered a private zone",
      "time": "2023-11-02T05:19:48.578Z",
      "zone": "L2A - J1 Facility Area",
      "camera": "L1-21",
      "team": "PTSM Pte Ltd",
      "status": "completed",
      "authority": "6548a2e5258c5a0dedd6eec5",
      "assigned": "6548a2e5258c5a0dedd6eec5"
    }
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
