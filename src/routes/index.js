const auth = require('../app/middleware/auth');
const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');
const userRouter = require('./user');
const authRouter = require('./auth');
const adminRouter = require('./admin');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/news', auth, newsRouter);
    app.use('/me', auth, meRouter);
    app.use('/courses', auth, coursesRouter);
    app.use('/users', userRouter);
    app.use('/', auth, siteRouter);
    //admin
    app.use('/admin', adminRouter)
}

module.exports = route;
