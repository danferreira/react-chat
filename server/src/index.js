import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressJwt from 'express-jwt';

import cors from 'cors';

import Config from './config';
import models from './models';
import typeDefs from './schemas/user';
import resolvers from './resolvers/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(expressJwt({
    secret: Config.token,
    credentialsRequired: false,
}));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        models,
        user: req.user,
    }),
    // formatError: (error) => {
    //     console.log(error);
    //     return {
    //         code: error.extensions.code,
    //         message: error.message,
    //     };
    // },
    // debug: false,
});

server.applyMiddleware({ app });

models.sequelize.sync({
    // force: true,
}).then(() => {
    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});
