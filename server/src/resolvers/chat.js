import { withFilter } from 'apollo-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import isAuthenticatedResolver from '../permissions';

const pubSub = new RedisPubSub({
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: 6379,
        retry_strategy: options => Math.max(options.attempt * 100, 3000),
    },
});

const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
    Query: {
        fetchMessages: isAuthenticatedResolver.createResolver(async (root, { contactId, cursor }, { models, user }) => {
            const options = {
                where: {
                    senderId: {
                        [models.sequelize.Op.or]: [user.payload.id, contactId],
                    },
                    receiverId: {
                        [models.sequelize.Op.or]: [user.payload.id, contactId],
                    },
                },
                order: [['id', 'DESC']],
                limit: 20,
            };

            // await new Promise(resolve => setTimeout(() => resolve(console.log('sleep')), 2000));

            if (cursor) {
                options.where.id = {
                    [models.sequelize.Op.lt]: cursor,
                };
            }

            return models.Message.findAll(options, { raw: true });
        }),
    },
    Mutation: {
        createMessage: isAuthenticatedResolver.createResolver(async (root, { receiverId, content }, { models, user }) => {
            const result = await models.Message.create({ senderId: user.payload.id, receiverId, content });
            pubSub.publish(NEW_MESSAGE, {
                senderId: user.payload.id,
                receiverId,
                newMessage: result,
            });

            return {
                success: true,
            };
        }),
    },
    Subscription: {
        newMessage: {
            subscribe:
                isAuthenticatedResolver.createResolver(withFilter(
                    () => pubSub.asyncIterator(NEW_MESSAGE),
                    ({ senderId, receiverId }, { contactId }, { user }) => {
                        if (!contactId) {
                            // just check if it's the current logged user listening for new messages to/from him
                            return (senderId === user.payload.id || receiverId === user.payload.id);
                        }

                        // message should be
                        // from subscribed user to contact or
                        return ((senderId === user.payload.id && receiverId === contactId) ||
                            // from contact to subscribed user
                            (senderId === contactId && receiverId === user.payload.id));
                    },
                )),
        },
    },
};
