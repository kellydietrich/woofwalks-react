"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({
            required_error: "First name is required",
        }),
        lastName: (0, zod_1.string)({
            required_error: "Last name is required",
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }).refine(function (data) { return data.password === data.passwordConfirmation; }, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
exports.verifyUserSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        verificationCode: (0, zod_1.string)(),
    }),
});
exports.forgotPasswordSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        }).email("Not a valid email"),
    }),
});
exports.resetPasswordSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)(),
        passwordResetCode: (0, zod_1.string)(),
    }),
    body: (0, zod_1.object)({
        password: (0, zod_1.string)({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }),
    }).refine(function (data) { return data.password === data.passwordConfirmation; }, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
