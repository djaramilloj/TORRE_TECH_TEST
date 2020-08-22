const auth = require('../components/auth/routing');
const lists = require('../components/lists/routing');

const routes = (app) => {
    app.use('/auth', auth);
    app.use('/lists', lists)
}

module.exports = routes;