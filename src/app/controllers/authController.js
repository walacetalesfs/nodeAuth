const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
const authConfig = require('../../config/global/auth');
const mailer = require('../../modules/mailer');

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

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'usuário não encontrado' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });

        mailer.sendMail({
            to: email,
            from: 'walacetales@hotmail.com',
            template: 'auth/forgot_password',   //não sei pq mas ta ignorando essa linha e buscando o template "main.html"
            context: { token },
        },
            err => {
                if (err)
                    return res.status(400).send({ error: 'não foi possivel enviar o email de recuperação' });

                console.log('email de recuperação de senha enviado!');
                return res.send();
            }
        );
        res.send();
    } catch (err) {
        res.status(400).send({ error: 'erro ao recuperar a senha' });
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'usuário não encontrado' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'token inválido' });

        if ((new Date()) > user.passwordResetExpires)
            return res.status(400).send({ error: 'token expirado' });

        user.password = password;
        await user.save();

        res.send();
    } catch (err) {
        res.status(400).send({ error: 'erro ao resetar a senha' });
    }
});


module.exports = app => app.use('/auth', router);
