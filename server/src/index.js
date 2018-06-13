import express from 'express';
import { ApolloServer } from 'apollo-server';
import { registerServer } from 'apollo-server-express';
import expressJwt from 'express-jwt';

import mongoose from 'mongoose';

import authRouter from './routes/auth'
import typeDefs from './graphql/schema';
// import resolvers from './graphql/resolvers';

mongoose.connect('mongodb://mongo/chat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connected...'));

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressJwt({
  secret: 'secret'
}).unless({ path: ['/api/register', '/api/login/'] }));

app.use('/api', authRouter);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  } else {
    next(err);
  }
});

const server = new ApolloServer({ typeDefs, mocks: true });

registerServer({ app, server })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});