"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requireUser = function (req, res, next) {
    console.log(req.body);
    var user = res.locals.user;
    if (!user) {
        return res.sendStatus(403);
    }
    return next();
};
exports.default = requireUser;
