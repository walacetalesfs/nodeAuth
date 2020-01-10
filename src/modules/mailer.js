const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { host, port, user, pass } = require('../config/global/mail');

const mailsPath = path.resolve('./src/resources/mail/');

var transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user: user,
        pass: pass
    }
});

transport.use('compile', hbs({
    viewEngine: {
        extname: '.html',
        layoutsDir: mailsPath,
        partialsDir: mailsPath,
    },
    viewPath: mailsPath,
    extName: '.html'
}));

module.exports = transport;