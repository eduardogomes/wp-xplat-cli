# Deploy your application to a Docker container

Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package.

1. Install [Docker](https://www.docker.com/get-docker)

2. Build the application in the container using the following command:

```
docker build -t wp-chatbot-boilerplate-node
```

3. Run your container locally 

```
docker run -p 5000:5000 -d wp-chatbot-boilerplate-node
```
