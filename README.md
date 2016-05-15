# Mocking pg with testdouble

This project is an example setup of the following stack:

- [express](http://expressjs.com/) for an API server
- [pg-query-bluebird](https://www.npmjs.com/package/pg-query-bluebird) as our interface to a PostgreSQL database
- [testdouble](https://www.npmjs.com/package/testdouble) for unit test mocking/stubbing
- [joi](https://www.npmjs.com/package/joi) for input and configuration validation

I have been experimenting with mocking postgres via testdouble to get high unit test code coverage. This repo shows some of the patterns and examples I have found.

## Mocking Database Results

- relatively straightforward to `td.replace(pg, 'query')` and return promises for zero rows, some rows, an error

## Configuration Validation

- nice pattern to declare schema for your configuration
- joi handles validation, coercion to desired types, and reasonable error message generation
- clearly exit with error and good error message when configuration is invalid
- configuration comes from environment variables exclusively which is 12-Factor App compliant
- read `code/config.js` for supported environment variables
- Use the official postgresql supported environment variable names and their defaults as well
- reasonable defaults for local development provided
- valid configuration not required to run and pass unit tests
  - `git clone && npm install && npm test` works

## How to run the npm scripts

- `npm test` to run tape unit tests
- `npm start` to run the server
- `npm run lint` to run eslint static analysis
- `npm run coverage` to run istanbul code coverage for the unit tests

## Unit Test Code Coverage

- `npm run coverage`
- have 100% coverage of the express route handler functions, which represent the primary business logic of the application
