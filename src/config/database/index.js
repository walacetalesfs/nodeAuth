const mongoose = require('mongoose');
const constants = require('../global/constants');

mongoose.connect(constants.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = mongoose;