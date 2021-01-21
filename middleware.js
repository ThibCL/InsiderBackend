"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
exports.checkToken = function (req, res, next) {
    console.log("Check token");
    var token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, "secret", function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: err.message,
                });
            }
            else {
                req.body.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.json({
            success: false,
            message: "Auth token is not supplied",
        });
    }
};
//# sourceMappingURL=middleware.js.map