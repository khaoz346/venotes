const express = require('express');
const cors = require('cors');
const { makeGraphqlHTTP } = require('./graphql');
const { setupKnex } = require('./database/knex');
const { authenticate: authMiddleware } = require('./middleware/authenticate');
const { errorHandler: errorMiddleware } = require('./middleware/errorHandler');
const { addGuestRoute } = require('./guestRoute');

setupKnex();

const app = express();
app.use(cors());
addGuestRoute(app);
app.use('/', authMiddleware);
app.use('/graphql', makeGraphqlHTTP());
app.use(errorMiddleware);
app.listen(5050);
console.log('Running a GraphQL API server at http://localhost:5050/graphql');
