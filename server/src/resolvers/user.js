import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import { BadUserInputError } from 'apollo-server';

const safeHandler = handler =>
    (...args) => handler(...args).catch((e) => {
        if (e instanceof ValidationError) {
            throw new BadUserInputError('input', {
                inputErrors: e.errors.map(err => ({ [err.path]: err.message })),
            });
        } else if (e instanceof BadUserInputError) {
            throw e;
        }
        console.log(e);
        throw new Error('Internal Server Error');
    });

const getToken = payload => (
    jwt.sign({
        payload,
    }, 'token-secret')
);

export default {
    Query: {
        getUserContacts: (root, { id }, { models }) => {

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
                throw new BadUserInputError('input', {
                    email: 'Invalid credentials',
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
                throw new BadUserInputError('input', {
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
