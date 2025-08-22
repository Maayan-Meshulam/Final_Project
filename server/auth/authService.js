const buildError = require("../helpers/erorrs/errorsHandeling");
const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = "Jwt";

const auth = (req, res, next) => {

    if (TOKEN_GENERATOR == 'Jwt') {
        console.log("in auth function");

        const token = req.header('x-auth-token');
        console.log(token + "token");


        if (!token) {
            return next(buildError("Authentication Error", "pleae login", 401))
        }

        const payload = verifyToken(token);

        if (!payload) {
            return next(buildError("Authentication Error", "Incorrect details", 401))
        }

        req.userInfo = payload;
        return next();
    }

    return next(buildError("Error", "generator is not axist", 401));
};

module.exports = auth;