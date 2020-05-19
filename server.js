const express = require('express');
const helmet = require('helmet');


const AuthRouter = require('./routers/auth/auth-router');
const UsersRouter = require('./routers/users/users-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/auth', AuthRouter);
server.use('/api/users', UsersRouter);

module.exports = server;