const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Response = require('../../classes/Response');
const { mongooseToObject } = require('../../../util/mongoose');
const { setUserInfo, setAccessToken } = require('../../../util/cookie');
const { validationResult, matchedData } = require('express-validator');

class AdminAuthController {
    // [GET] /
    signIn(req, res) {
        console.log(req)
        res.render('admin/auth/login');
    }
    async login(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            var errMsg = errors.mapped();
            var inputData = matchedData(req);
            console.log(inputData);
            console.log(errMsg);
            return res.render('admin/login', {
                errors: errMsg,
                inputData: inputData,
            });
        }
        // if (errors.length > 0) {
        //     console.log(errors)
        //     //res.render('auth/login', errors)
        //     res.redirect('/auth/login')
        // }
        const { email, password } = req.body;
        console.log(req);
        const user = await User.findByCredentials(req, res, email, password);
        if (!user) {
            //return Response.unauthorized(res)
            //return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            res.redirect('/admin/login');
        } else {
            if (user.role === 'admin') {
                // generate session
                req.session.user = user;
                res.redirect('/admin/dashboard');
            } else {
                res.redirect('/admin/login');
            }
        }
        //generate token api

        // const token = await user.generateAuthToken()
        // const expireAt = token.expireAt;
        // setUserInfo(res, mongooseToObject(user), expireAt)
        // setAccessToken(res, token, expireAt)
        //res.json({ user, token })




        // if (!user) {
        //     throw new Error({ error: 'Invalid login credentials' })
        // }
        // const isPasswordMatch = await bcrypt.compare(password, user.password)
        // if (!isPasswordMatch) {
        //     throw new Error({ error: 'Invalid login credentials' })
        // }
        // //const user = User.findByCredentials(email, password)

        // if (!user) {
        //     return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        // }
        // //const token = jwt.sign({ _id: user._id }, 'RESTFULAPIs')
        // // const token = user.generateAuthToken()
        // res.send(user)
    }

    logout(req, res, next) {
        if (req.session) {
            // delete session object
            res.app.settings.user = {}
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/auth/login');
                }
            });
        }
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new AdminAuthController();
