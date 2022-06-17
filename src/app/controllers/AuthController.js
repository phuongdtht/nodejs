const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const Response = require('../classes/Response');
const { mongooseToObject } = require('../../util/mongoose');
const { setUserInfo, setAccessToken } = require('../../util/cookie');

class AuthController {
    // [GET] /
    signIn(req, res) {
        console.log(12222)
        res.render('auth/login');
    }
    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findByCredentials(res, email, password)
        if (!user) {
            return Response.unauthorized(res)
            //return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }

        const token = await user.generateAuthToken()
        const expireAt = token.expireAt;
        setUserInfo(res, mongooseToObject(user), expireAt)
        setAccessToken(res, token, expireAt)
        res.redirect('/users')
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

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new AuthController();
