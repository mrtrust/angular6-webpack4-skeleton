// taken from https://github.com/gdi2290/angular-starter

/**
 * Look in ./config folder for webpack.dev.js
 */

switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod')({env: 'production'});
        break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.test')({env: 'test'});
        break;
    case 'local':
        module.exports = require('./config/webpack.local')({env: 'local'});
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require('./config/webpack.dev')({env: 'dev'});
}
