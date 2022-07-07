const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    // middleware with session
    if (req.session && req.session.user) {
        res.app.settings.user = req.session.user
        next()
        //res.locals.user = req.session.user
    } else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        // return res.redirect('/auth/login');
    }

    // middleware with api token
    // const token = req.header('Authorization').replace('Bearer ', '')
    // const data = jwt.verify(token, process.env.JWT_KEY)
    // try {
    //     const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    //     if (!user) {
    //         throw new Error()
    //     }
    //     req.user = user
    //     req.token = token
    //     next()
    // } catch (error) {
    //     res.status(401).send({ error: 'Not authorized to access this resource' })
    // }

}
module.exports = auth