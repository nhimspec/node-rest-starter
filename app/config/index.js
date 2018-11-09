const cors = require('./cors')

module.exports = {
    secret: process.env.APP_SECRET,
    isProd: process.env.NODE_ENV === 'prod',
    isDev: process.env.NODE_ENV === 'dev',
    cors
};
