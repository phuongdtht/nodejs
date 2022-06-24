const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const Response = require('../classes/Response');
const { mongooseToObject } = require('../../util/mongoose');
const { setUserInfo, setAccessToken } = require('../../util/cookie');
const { validationResult } = require('express-validator');

class AuthController {
    // [GET] /
    signIn(req, res) {

        res.render('auth/login');
    }
    async login(req, res, next) {
        const errors = validationResult(req);
        if (errors.length > 0) {
            console.log(errors)
            //res.render('auth/login', errors)
            res.redirect('/auth/sign-in')
        }
        const { email, password } = req.body
        const user = await User.findByCredentials(res, email, password)
        if (!user) {
            //return Response.unauthorized(res)
            //return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            res.redirect('/auth/sign-in')
        }
        //generate token api

        // const token = await user.generateAuthToken()
        // const expireAt = token.expireAt;
        // setUserInfo(res, mongooseToObject(user), expireAt)
        // setAccessToken(res, token, expireAt)
        //res.json({ user, token })

        // generate session 
        req.session.user = user;

        res.redirect('/users');


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
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/auth/sign-in');
                }
            });
        }
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new AuthController();
