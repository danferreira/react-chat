import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import { UserInputError } from 'apollo-server';

import Config from '../config';

const safeHandler = handler =>
    (...args) => handler(...args).catch((e) => {
        if (e instanceof ValidationError) {
            throw new UserInputError('input', {
                inputErrors: e.errors.map(err => ({ [err.path]: err.message })),
            });
        } else if (e instanceof UserInputError) {
            throw e;
        }
        console.log(e);
        throw new Error('Internal Server Error');
    });

const getToken = payload => (
    jwt.sign({
        payload,
    }, Config.token)
);

export default {
    Query: {
        getUserContacts: async (root, args, { models, user }) => {
            const result = await models.sequelize.query(
                `
                select 
                    u.id as contact_id, 
                    u.email as contact_email, 
                    m.last_message, 
                    m.last_message_date 
                from 
                    users u join 
                    (
                        select 
                            distinct on(contact_id) 
                            CASE
                                WHEN sender_id = ${user.payload.id} THEN receiver_id
                                ELSE sender_id
                            END AS contact_id, 
                            content as last_message, 
                            created_at as last_message_date
                        from 
                            messages 
                        where 
                            sender_id=${user.payload.id} OR
                            receiver_id=${user.payload.id}
                        order by 
                            contact_id, created_at desc
                    ) as m on u.id = m.contact_id
                    order by created_at desc`,
                { type: models.sequelize.QueryTypes.SELECT },
            );

            return result.map(r => ({
                id: r.contact_id,
                name: r.contact_email,
                lastMessage: r.last_message,
                lastMessageDate: r.last_message_date,
            }));
        },
    },

    Mutation: {
        login: async (root, { email, password }, { models }) => {
            const user = await models.User.findOne({
                where: {
                    email,
                },
            });

            if (!user || !user.comparePassword(password)) {
                throw new UserInputError('input', {
                    inputErrors: [{
                        email: 'Invalid Credentials',
                    }],
                });
            }

            return {
                success: true,
                token: getToken({ id: user.id }),
            };
        },
        register: safeHandler(async (root, { email, password }, { models }) => {
            const result = await models.User.findOrCreate({
                where: {
                    email,
                },
                defaults: {
                    password,
                },
                raw: true,
            });

            const [user, created] = result;

            if (!created) {
                throw new UserInputError('input', {
                    inputErrors: [{
                        email: 'E-mail already in use',
                    }],
                });
            }

            return {
                success: true,
                token: getToken({ id: user.id }),
            };
        }),
    },
};
