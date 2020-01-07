const express = require('express');
const bodyParser = require('body-parser');

const constants = require('./config/global/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(constants.PORT, () => { console.log(`servidor rodando em ${constants.URL}`) });
