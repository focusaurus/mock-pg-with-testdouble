# Mocking pg with testdouble

This project is an example setup of the following stack:

- [express](http://expressjs.com/) for an API server
- [pg-query-bluebird](https://www.npmjs.com/package/pg-query-bluebird) as our interface to a PostgreSQL database
- [testdouble](https://www.npmjs.com/package/testdouble) for unit test mocking/stubbing
- [joi](https://www.npmjs.com/package/joi) for input and configuration validation

I have been experimenting with mocking postgres via testdouble to get high unit test code coverage. This repo shows some of the patterns and examples I have found.
