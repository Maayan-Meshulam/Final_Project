const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "Jwt";

const auth = (req, res, next) => {

    if (TOKEN_GENERATOR == 'Jwt') {
        console.log("in auth function");
        console.log(req);

        const token = req.header('x-auth-token');

        if (!token) {
            return next(new Error("Authentication", "pleae login", 401))
        }

        const payload = verifyToken(token);

        if (!payload) {
            return next(new Error("Authentication", "Incorrect details", 401))
        }

        req.userInfo = payload;
        return next();
    }

    next(new Error("generator is not axist"));
};

module.exports = auth;