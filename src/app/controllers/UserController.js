const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { getAccessToken } = require('../../util/cookie')

class UserController {
    // [GET] /users/index
    index(req, res, next) {
        if (getAccessToken(res)) {
            req.header('Authorization') = 'Bearer ' + getAccessToken(res)
        }
        Promise.all([User.find({}), User.countDocumentsDeleted()])
            .then(([users, deletedCount]) =>
                res.render('users/index', {
                    deletedCount,
                    users: mutipleMongooseToObject(users),
                }),
            )
            .catch(next);
    }

    // [GET] /courses/:slug
    show(req, res, next) {
        User.findOne({ _id: req.params._id })
            .then((user) =>
                // console.log("course", user);
                // res.send({ "data": mongooseToObject(user) });
                res.render('users/show', {
                    user: mongooseToObject(user),
                }),

            )
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('users/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        console.log(req.body)
        // req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const user = new User(req.body);
        user.save()
            .then(() => res.redirect('/users'))
            .catch((error) => { });
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        User.findById(req.params.id)
            .then((user) =>
                res.render('users/edit', {
                    user: mongooseToObject(user),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/users'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        User.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        User.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new UserController();
