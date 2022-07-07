class Response {
    makeResponseData(req, res, success, data, message, code, redirect) {
        console.log(req);
        // if (req.accept('application/json') === 'application/json') {
        //     const status = code < 300 ? 'success' : 'error';
        //     const response = {
        //         'status': status,
        //         'data': data,
        //         'message': message,
        //     };
        //     //let json = circularJSON.stringify(response);
        //     // response['status'] = status;
        //     // response['data'] = data;
        //     // response['message'] = message;
        //     return res.status(code).send(response);
        // }

        if (message) {
            req.session.sessionFlash = {
                class: success === true ? 'success' : 'danger',
                icon: success === true ? 'la la-check' : 'la la-times',
                message: message,
            }
            // console.log(req.flash('response_message'))
            // res.locals.flash = req.flash('response_message')
            //res.app.settings.flash = req.flash('response_message')
            // {
            //     class: success === true ? 'success' : 'danger',
            //         icon: success === true ? 'la la-check' : 'la la-times',
            //             message: message,
            // }
            //console.log(res.locals.flash)
            //console.log(res.app.settings.flash)
        }

        if (redirect) {
            console.log(redirect)
            return res.render(redirect);
        }
    }

    success(req, res, data, message, redirect) {
        return this.makeResponseData(
            req,
            res,
            true,
            data,
            message,
            200,
            redirect,
        );
    }

    badRequest(res, message) {
        return this.makeResponseData(res, null, message, 400);
    }

    unauthorized(res) {
        const message = 'Login failed! Check authentication credentials';
        return this.makeResponseData(res, null, message, 401);
    }

    error(req, res, data = null, message, redirect = null) {
        return this.makeResponseData(
            req,
            res,
            false,
            data,
            message,
            200,
            redirect,
        );
    }
}

module.exports = new Response();
