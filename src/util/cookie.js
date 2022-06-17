
module.exports = {
    setUserInfo: function (res, data, expireAt) {
        res.cookie("userInfo", data, {
            path: "/",
            expires: (expireAt),
        });
    },
    setAccessToken: function (res, token, expireAt) {
        res.cookie("token", token, {
            path: "/",
            expires: (expireAt),
        });
    },
    getUserInfo: function (res) {
        return res.cookie.userInfo;
    },
    getAccessToken: function (res) {
        const userInfo = this.getUserInfo();
        const token = res.cookie.token
        return token;
    },
    revokeUser() {
        const options = {
            path: "/",
        };
        cookie.remove("userInfo", options);
        cookie.remove("token", options);
    },
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    isAuthenticated() {
        const userInfo = getUserInfo();
        const token = getAccessToken();
        return !!userInfo && !!token && userInfo.role === Role.user;
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};

