"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
var user_model_js_1 = require("../models/user.model.js");
function createUser(input) {
    return user_model_js_1.default.create(input);
}
exports.createUser = createUser;
function findUserById(id) {
    return user_model_js_1.default.findById(id);
}
exports.findUserById = findUserById;
function findUserByEmail(email) {
    return user_model_js_1.default.findOne({ email: email });
}
exports.findUserByEmail = findUserByEmail;
