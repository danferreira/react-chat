import { createServer } from 'http';
import express from 'express';
import path from 'path';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
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
    context: ({ req, connection }) => {
        if (connection) {
            return {
                user: connection.context.user,
            };
        }

        return {
            models,
            user: req ? req.user : null,
        };
    },
    // debug: false,
    subscriptions: {
        onConnect: connectionParams => new Promise((resolve, reject) => {
            if (connectionParams.Token) {
                const user = jwt.verify(connectionParams.Token, Config.token);

                if (user) return resolve({ user });
            }

            return reject(new AuthenticationError('Invalid Token'));
        }),
    },
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
