class Response {
    makeResponseData(res, data, message, code) {
        const status = code < 300 ? 'success' : 'error';
        const response = {
            'status': status,
            'data': data,
            'message': message,
        };
        //let json = circularJSON.stringify(response);
        // response['status'] = status;
        // response['data'] = data;
        // response['message'] = message;
        return res.status(code).send(response);
    }

    success(res, data, message, statusCode = 200) {
        return this.makeResponseData(res, data, message, statusCode);
    }

    badRequest(res, message) {
        return this.makeResponseData(res, null, message, 400);
    }

    unauthorized(res) {
        const message = 'Login failed! Check authentication credentials';
        return this.makeResponseData(res, null, message, 401);
    }
}

module.exports = new Response();