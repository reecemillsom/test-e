# test-e
Build an application that handles battery states.

## Prerequisites

1. Docker & Docker Compose installation: https://docs.docker.com/compose/install/
2. Yarn installed at version v1.22.22: https://classic.yarnpkg.com/en/docs/install#windows-stable

## Getting started

1. `yarn` - install dependencies in the route of the project
2. `cd ./api/ && yarn start:db` - This will start the container for the postgres database.
3. Add the following to .env in the route of the API directory `DATABASE_URL="postgresql://test:secret@localhost:54325/postgres?schema=public"`
4. `yarn run:migration:db` - This will run the migration script to instantiate the Battery table
5. `yarn seed:db` - This will create a default battery in the table to use within the application.
6. `cd ./client/` - Create `.env.local` file in the route of the directory, and paste the contents `NEXT_PUBLIC_API_URL="http://localhost:3000/batteries"`

## Commands

Testing: In the route of project run `yarn test`

Building: In the route of the project run `yarn build`

Starting App: Open 2 terminals, in one cd into api and run `yarn start` in the other cd into client and run `yarn dev`

## Testing

Once the API & Client have been started, you are ready to test. The API should start on port `3000` and the client on port `3001`.

When opening the client you will be presented with a battery and some of the information for it.

Inputs are triggered by hitting the enter button, I have mentioned improving this in one of the points below.

Happy testing :).

## Things I would do as improvements

1. Instead of returning error messages from the API, I would instead return codes and find the message based on a client mapping between code and message.
   - This will enable code reuse across the API, meaning we could use the same code more than once, and the client would be able to deal with it accordingly.

2. Instead of using yarn v1 I would use a more recent version. This is because v1 will eventually be coming to end of life.

3. For UI / UX add 'submit buttons' for the number inputs. Have that behaviour as well as the enter key functionality for submissions.
   - I think this would be a more intuitive behaviour than having to hit the enter key.

4. For mobile view move the Battery meta and editing fields underneath the battery as opposed to next to it.

5. Handle float numbers better in cases where you charge / discharge part of a kW or take off 10% capacity.

6. Create a Docker file that can be deployed for the API to run in an ECS container.

7. Client side I would add a E2E test to check that the behaviour works as expected. E.g. if I discharge / charge / empty 3 times, etc...

## Deployments

1. Create Github Action pipelines to deploy to production.
   - Make use of the AWS actions to help with authentication and deployment logic.

## Thinking about production

1. Authentication 
   1. Could put the API behind an API gateway and do the authentication at that layer.
      - Or you could use JWT auth or another library at the API level, create a middleware for the API, and use it for routes that require authentication.

2. PostgreSQL should be put into a private subnet with no internet access. Only access from the API is granted. Should be created through the RDS service.

3. Image for the API should be created and stored in ECR, and we can make use of that image when running the API in ECS.