import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

var router = express.Router();

router.post('/register', async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user)
            return res.status(200).send({
                status: "success",
                data: {
                    message: "User already exists"
                }
            });

        user = await User.create(req.body);
        user.password = undefined;

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({
            status: "error",
            data: {
                message: err
            }
        })
    }
})

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(200).send({
            status: "success",
            data: {
                message: "User not found"
            }
        });

    var result = await bcrypt.compare(password, user.password);

    if (!result)
        return res.status(200).send({
            status: "success",
            data: {
                message: "Wrong password"
            }
        });

    user.password = undefined;

    const token = jwt.sign({
        id: user.id
    }, 'token-secret')

    res.status(200).send({
        status: "success",
        data: {
            user,
            token
        }
    })
});

export default router;