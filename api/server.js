const express = require('express');
const helmet = require('helmet');
const db = require('../data/db-config.js');
const Router = require('../users/users-router');
const authRouter = require('../auth/auth-router');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api/users', Router);
server.use('/api/auth', authRouter);
server.get('/', (req, res) =>
res.send('<h1>Server is up and running!!!</h1>'),
);
module.exports = server;