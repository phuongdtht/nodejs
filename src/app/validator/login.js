const { check } = require('express-validator');

let validateLogin = () => {
    return [
        //check('name', 'name does not Empty').not().isEmpty(),
        //check('user.username', 'username must be Alphanumeric').isAlphanumeric(),
        //check('user.username', 'username more than 6 degits').isLength({ min: 6 }),
        check('email', 'Invalid does not Empty').not().isEmpty(),
        check('email', 'Invalid email').isEmail(),
        //check('user.birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
        check('password', 'password more than 7 degits').isLength({ min: 7 })
    ];
}

module.exports = { validateLogin };