import { createResolver } from 'apollo-resolvers';
import { AuthenticationError } from 'apollo-server';


export default createResolver((root, args, { user }) => {
    if (!user) throw new AuthenticationError('You need to be authenticated');
});
