import { ValidationError } from 'sequelize';
import { UserInputError, PubSub, withFilter } from 'apollo-server';

const pubSub = new PubSub();

const NEW_MESSAGE = 'NEW_MESSAGE';

const safeHandler = handler =>
    (...args) => handler(...args).catch((e) => {
        if (e instanceof ValidationError) {
            throw new UserInputError('input', {
                inputErrors: e.errors.map(err => ({ [err.path]: err.message })),
            });
        } else if (e instanceof UserInputError) {
            throw e;
        }
        throw new Error('Internal Server Error');
    });

export default {
    Query: {
        fetchMessages: async (root, { contactId, cursor }, { models, user }) => {
            const options = {
                where: {
                    senderId: user.payload.id,
                    receiverId: contactId,
                },
                order: [['id', 'DESC']],
                limit: 20,
            };

            await new Promise(resolve => setTimeout(() => resolve(console.log('sleep')), 2000));

            if (cursor) {
                options.where.id = {
                    [models.sequelize.Op.lt]: cursor,
                };
            }

            return models.Message.findAll(options, { raw: true });
        },
    },
    Mutation: {
        createMessage: async (root, { receiverId, content }, { models, user }) => {
            const result = await models.Message.create({ senderId: user.payload.id, receiverId, content });
            pubSub.publish(NEW_MESSAGE, {
                contactId: receiverId,
                newMessage: result,
            });

            return {
                success: true,
            };
        },
    },
    Subscription: {
        newMessage: {
            subscribe:
                withFilter(
                    () => pubSub.asyncIterator(NEW_MESSAGE),
                    (payload, args) => {
                        console.log(payload.contactId, args);
                        return payload.contactId === args.contactId;
                    },
                ),
        },
    },
};
