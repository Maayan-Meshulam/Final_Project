const cors = require("cors");

const corsMiddleWare = cors({
        origin: [
            "http://localhost:3131"
        ]
    });

module.exports = corsMiddleWare;
