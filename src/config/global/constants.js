const PORT = process.env.PORT || 3000;
const HOST = "localhost";
const URL = `http://${HOST}:${PORT}`;
const DB = process.env.MONGO_URL || `mongodb://${HOST}/restapi`;

module.exports = {
    PORT,
    HOST,
    URL,
    DB
};  