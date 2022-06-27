const auth = require('../app/middleware/auth');
const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const userRouter = require('./user');
const authRouter = require('./auth');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/news', auth, newsRouter);
    app.use('/me', auth, meRouter);
    app.use('/courses', auth, coursesRouter);
    app.use('/users', userRouter);
    app.use('/', auth, siteRouter);
}

module.exports = route;
