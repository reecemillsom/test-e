# sunsave-test
Build an application that handles battery states.

## Prerequisites

1. Docker & Docker Compose installation: https://docs.docker.com/compose/install/
2. Yarn installed at version v1.22.22: https://classic.yarnpkg.com/en/docs/install#windows-stable
3. 

## Getting started

1. `yarn` - install dependencies in the route of the project
2. `cd ./api/ && yarn start:db` - This will start the container for the postgres database.
3. `yarn run:migration:db` - This will run the migration script to instantiate the Battery table
4. `yarn seed:db` - This will create a default battery in the table to use within the application.

## Commands

Testing: In the route of project run `yarn test`

Building: In the route of the project run `yarn build`

Starting App: Open 2 terminals, in one cd into api and run `yarn start` in the other cd into client and run `yarn dev`

## Things I would do as improvements

1. Instead of returning error messages from the API, I would instead return codes and find the message based on a client mapping between code and message.
   - This will enable code reuse across the API, meaning we could use the same code more than once, and the client would be able to deal with it accordingly.

2. Instead of using yarn v1 I would use a more recent version. This is because v1 will eventually be coming to end of life.

3. For UI / UX add 'submit buttons' for the number inputs. Have that behaviour as well as the enter key functionality for submissions.
   - I think this would be a more intuitive behaviour than having to hit the enter key.

4. For mobile view move the Battery meta and editing fields underneath the battery as opposed to next to it.

5. Handle float numbers better in cases where you charge / discharge part of a kW or take off 10% capacity.

6. Create a Docker file that can be deployed for the API to run in an ECS container.

## Deployments

1. Create Github Action pipelines to deploy to production.
   - Make use of the AWS actions to help with authentication and deployment logic.

## Thinking about production

1. Authentication 
   1. Could put the API behind an API gateway and do the authentication at that layer.
      - Or you could use JWT auth or another library at the API level, create a middleware for the API, and use it for routes that require authentication.

2. PostgreSQL should be put into a private subnet with no internet access. Only access from the API is granted. Should be created through the RDS service.

3. Image for the API should be created and stored in ECR, and we can make use of that image when running the API in ECS.