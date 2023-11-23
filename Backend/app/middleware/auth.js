const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");
const ApiError = require("../api-error")
const verifyToken = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, config.JWT_KEY);
        const user = await User.findOne({ _id: decoded._id })
        delete password
        req.user = user;
        return res.status(200).send(user);
    } catch (err) {
        return res.status(401).send("Invalid JWT token");
    }
    return next();
};




module.exports = verifyToken;
