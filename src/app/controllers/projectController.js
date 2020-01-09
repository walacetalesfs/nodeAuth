const express = require('express');
const authMiddlewere = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddlewere);

router.get('/', (req, res) => {
    return res.send('fon');
});

module.exports = app => app.use('/project', router);
