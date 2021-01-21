# Simple API

This is the api part for the simple platform. It runs on node and mysql as the core technologies. It uses koa and typeorm to make it easier to write more compact code with less surface for errors.

# Prerequisites

1. node, at least version 10 recommended, 12 perferred
2. Install docker, needed for the db container
3. Install yarn globally, I peref using it `npm i -g yarn`

# How to run

0. Copy over the `.env.example` to `.env` so that the DB config is used for local
1. Execute `yarn up` to create the required docker conatiners for the db.
   1.1 There's also phpmyadmin for easier development and debugging at [localhost:9001](http://localhost:9001).
2. Execute `yarn start` to start the node server. The api is prefixed with `/api`, you you can try executing this command to get some response `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3001/api/users`, or maybe use your REST client of choice, like postman or insomnia.
3. To stop the running containers execute `yarn down`

# Tests

There are tests to cover the service-layer as the most important part of this project.

# Folders

## Entities

The entities represent the models that map to the db tables. They also contain some validation annotations the get executed before the entity is persisted (created or updated).

## Repositories

The repositories layer is the CRUD part for the api. It works with the entities to persist them in the underlying db.

## Services

The services layer is handling the business logic. It makes sure that the business rules are followed. E.g. here is where the password is hashed before the entity is passed to the persistence layer, or when trying to get user by username and password.

## Controllers

This is the HTTP transport layer that exposes the business logic from the services to the consumers of the api. This is where the HTTP params mapping and status codes are located. It does not know anything about the business logic and is marely a transport layer.

## GraphQL

Additionally the data an be read using graphql. Execute queries on [localhost:3000/graphql] using the graphql playground. This is an example query. It gets a user by `username` and `password` and at the same time loads his todos.

1. You will need to get a JWT token before you can start working with the queries. Do this on the `POST /api/token` route, passing `{ username, password }`.
2. In the Playground you can add headers at the bottom of the screen. Define JSON with the following format:

```js
{
  "authorization": "Bearer [YOUR TOKEN]"
}
```

3. Execute the query

```js
{
  me {
  	username
    firstName
    lastName
    email
    todos {
      text
      completed
      dueDate
    }
  }
}
```

### Resolvers

This is the folder where the query and fields resolvers are located.

## DI Container

All the layers have access to a shared DI Container provided by typedi. It integrates nicely with most of the libs used in the projects and makes it easy to inject cross-cutting components in the different locations. So for e.g. the Service layer is used in both the REST Controllers as well as the Graphql Resolvers. This way the business logic located in the Service layer is shared between the two types of HTTP transport.
