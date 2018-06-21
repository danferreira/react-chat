import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import models from './models';
import typeDefs from './schemas/user';
import resolvers from './resolvers/user';

const app = express();

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(expressJwt({
//   secret: 'token-secret',
//   credentialsRequired: false
// }));

// app.use('/api', authRouter);

// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//         return res.status(401).send('invalid token');
//     }
//     console.log(err);
//     return res.status(500).send('Internal server error');
// });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        models,
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
