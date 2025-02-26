"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyUserHandler = exports.createUserHandler = void 0;
var nanoid_1 = require("nanoid");
var user_service_1 = require("../services/user.service");
var logger_1 = require("../utils/logger");
var mailer_1 = require("../utils/mailer");
var auth_controller_1 = require("./auth.controller");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var body, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, user_service_1.createUser)(body)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, (0, mailer_1.default)({
                            to: user.email,
                            from: "test@example.com",
                            subject: "Verify your email",
                            text: "verification code: ".concat(user.verificationCode, ". Id: ").concat(user._id),
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, res.send("User successfully created!!")];
                case 4:
                    e_1 = _a.sent();
                    if (e_1.code === 11000) {
                        return [2 /*return*/, res.status(409).send("Account already exists")];
                    }
                    return [2 /*return*/, res.status(500).send(e_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createUserHandler = createUserHandler;
function verifyUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, verificationCode, user, _a, accessToken, refreshToken, _b, accessToken, refreshToken, message, response;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = req.params.id;
                    verificationCode = req.params.verificationCode;
                    return [4 /*yield*/, (0, user_service_1.findUserById)(id)];
                case 1:
                    user = _c.sent();
                    if (!user) {
                        return [2 /*return*/, res.send("Could not verify user")];
                    }
                    if (!user.verified) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, auth_controller_1.tokenGenerator)(user)];
                case 2:
                    _a = _c.sent(), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                    return [2 /*return*/, res.send({
                            message: "User is already verified",
                            redirect: '/games',
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                        })];
                case 3:
                    if (!(user.verificationCode === verificationCode)) return [3 /*break*/, 6];
                    user.verified = true;
                    return [4 /*yield*/, user.save()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, (0, auth_controller_1.tokenGenerator)(user)];
                case 5:
                    _b = _c.sent(), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                    message = "User successfully verified!! Logging In...";
                    response = {
                        message: message,
                        redirect: '/games',
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    };
                    console.log(response);
                    return [2 /*return*/, res.send(response)];
                case 6: return [2 /*return*/, res.send("Could not verify user")];
            }
        });
    });
}
exports.verifyUserHandler = verifyUserHandler;
function forgotPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var message, email, user, passwordResetCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = "If a user with that email is registered you will receive a password reset email";
                    email = req.body.email;
                    return [4 /*yield*/, (0, user_service_1.findUserByEmail)(email)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        logger_1.default.debug("User with email ".concat(email, " does not exist"));
                        return [2 /*return*/, res.send(message)];
                    }
                    if (!user.verified) {
                        return [2 /*return*/, res.send("User is not verified")];
                    }
                    passwordResetCode = (0, nanoid_1.nanoid)();
                    user.passwordResetCode = passwordResetCode;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, mailer_1.default)({
                            to: user.email,
                            from: "test@example.com",
                            subject: "Reset your password",
                            text: "Password reset code: ".concat(passwordResetCode, ". Id ").concat(user._id),
                        })];
                case 3:
                    _a.sent();
                    logger_1.default.debug("Password reset email sent to ".concat(email));
                    return [2 /*return*/, res.send(message)];
            }
        });
    });
}
exports.forgotPasswordHandler = forgotPasswordHandler;
function resetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, id, passwordResetCode, password, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, id = _a.id, passwordResetCode = _a.passwordResetCode;
                    password = req.body.password;
                    return [4 /*yield*/, (0, user_service_1.findUserById)(id)];
                case 1:
                    user = _b.sent();
                    if (!user ||
                        !user.passwordResetCode ||
                        user.passwordResetCode !== passwordResetCode) {
                        return [2 /*return*/, res.status(400).send("Could not reset user password")];
                    }
                    user.passwordResetCode = null;
                    user.password = password;
                    return [4 /*yield*/, user.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.send("Successfully updated password")];
            }
        });
    });
}
exports.resetPasswordHandler = resetPasswordHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(req.body);
            return [2 /*return*/, res.send(res.locals.user)];
        });
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
