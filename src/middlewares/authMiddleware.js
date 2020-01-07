const jwt = require('jsonwebtoken');
const authConfig = require('../config/global/auth');

module.exports = (req, res, next) => {
    const tokenUser = req.headers.authorization;

    if (!tokenUser)
        return res.status(401).send({ error: 'token não informado' });

    const parts = tokenUser.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'token mal formado 1' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'token mal formado 2' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'token inválido' });

        req.userID = decoded.id;
        return next();
    });
}