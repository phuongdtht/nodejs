const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const toastr = require('express-toastr');

const route = require('./routes');
const db = require('./config/db');
const MongoStore = require('connect-mongo');
const { databaseToSession } = require('../src/config/db/database');
require('dotenv').config();

// Connect to DB
dbConnect = db.connect();

const app = express();
const port = 3001;
app.use(cookieParser());
// use session
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: 'test',
        cookie: { maxAge: 600000 },
        store: new MongoStore({
            mongoUrl: databaseToSession(),
            dbName: 'test',
            ttl: 60,
        }),
    }),
);

app.use(flash());
app.use(toastr());

app.use(function (req, res, next) {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    if (res.locals.sessionFlash) {
        if (res.locals.sessionFlash.class === 'success') {
            req.toastr.success(res.locals.sessionFlash.message)
        } else if (res.locals.sessionFlash.class === 'danger') {
            req.toastr.error(res.locals.sessionFlash.message)
        }
    }
    next();
});

app.use(function (req, res, next) {
    res.locals.toasts = req.toastr.render()
    next()
});

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.set('view options', { user: {} });

app.set('user', {});
// app.use(function (req, res, next) {
//     res.locals.flash = req.flash('response_message');
//     console.log(req.flash('response_message'))
//     next();
// });

// app.set(function (req, res, next) { 'flash', { req.flash('response_message') })};

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
