const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Response = require('../classes/Response');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: (value) => {
                if (!validator.isEmail(value)) {
                    throw new Error({ error: 'Invalid Email address' });
                }
            },
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        role: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_LIFE_TIME, // expires in 24 hours
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (req, res, email, password) => {
    console.log(req);
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (!user) {
        //return res.status(401).send('Invalid login credentials')
        const message = 'login fail';
        return Response.error(req, res, null, message, 'auth/login');
        //new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        const message = 'login fail';
        return Response.error(req, res, null, message, 'auth/login');
        //return Response.unauthorized(res);
        //return res.status(401).send('Invalid login credentials')
        //return new Error({ error: 'Invalid login credentials' })
    }
    return user;
};
// Add plugins
mongoose.plugin(slug);
userSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
