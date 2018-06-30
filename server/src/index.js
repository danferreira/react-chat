import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import expressJwt from 'express-jwt';
import cors from 'cors';

import Config from './config';
import models from './models';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(expressJwt({
    secret: Config.token,
    credentialsRequired: false,
}));

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
        models,
        user: req ? req.user : null,
    }),
    // debug: false,
    tracing: true,
});

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

models.sequelize.sync({
    // force: true,
}).then(() => {
    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`);
    });
});
