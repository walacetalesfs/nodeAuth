const mongoose = require('mongoose');
const constants = require('../global/constants');

mongoose.connect(`mongodb://${constants.HOST}/restapi`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;