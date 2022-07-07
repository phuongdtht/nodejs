const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Response = require('../../classes/Response');
const { mongooseToObject } = require('../../../util/mongoose');
const { setUserInfo, setAccessToken } = require('../../../util/cookie');
const { validationResult, matchedData } = require('express-validator');

class HomeController {
    // [GET] /
    dashboard(req, res) {
        console.log(req.session.user)
        res.render('admin/dashboard', { layout: 'admin' });
    }
}

module.exports = new HomeController();
