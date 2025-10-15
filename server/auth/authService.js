const { json } = require("express");
const buildError = require("../helpers/erorrs/errorsHandeling");
const { verifyToken } = require("./providers/jwt");

const TOKEN_GENERATOR = process.env.TOKEN_GENERATOR;

const auth = (req, res, next) => {

    if (TOKEN_GENERATOR == 'Jwt') {
        const token = req.header('x-auth-token');        

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