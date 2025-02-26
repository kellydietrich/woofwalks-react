"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateResource = function (schema) {
    return function (req, res, next) {
        try {
            schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (e) {
            return res.status(400).send(e.errors);
        }
    };
};
exports.default = validateResource;
