# Nest.js SQS Localstack
## Installation

Run project:
```
docker compose up
```
Create SQS queue in localstack container:
```
docker exec -it localstack awslocal sqs create-queue --queue-name localstack-queue
```

## Test
#### POST message to SQS:
http://localhost:3000/mails/send
Body: {
  "message": "hello"
}

### GET all messages from SQS
http://localhost:3000/mails
