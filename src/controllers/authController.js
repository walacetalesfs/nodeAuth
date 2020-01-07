const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../config/global/auth');

const router = express.Router();

log = (user) => {
    console.log(`\nuser: ${user}\nuser criado!\n\n`);
}

generateToken = (params = {}) => jwt.sign(
    params, authConfig.secret, { expiresIn: 86400 }
);

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'email de usuário já existe' });

        const user = await User.create(req.body);
        log(user);

        return res.send({ token: generateToken({ id: user.id }) });
    } catch (err) {
        return res.status(400).send({ error: 'falha ao registrar' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'usuário não encontrado' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'senha inválida' });

    res.send({ token: generateToken({ id: user.id }) });
});

module.exports = app => app.use('/auth', router);
