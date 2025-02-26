"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Import Controller
var user_controller_1 = require("../controllers/user.controller");
var requireUser_1 = require("../middleware/requireUser");
var validateResource_1 = require("../middleware/validateResource");
// Import Schema
var user_schema_1 = require("../schemas/user.schema");
var router = express_1.default.Router();
router.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
router.post("/api/users/verify/:id/:verificationCode", (0, validateResource_1.default)(user_schema_1.verifyUserSchema), user_controller_1.verifyUserHandler);
router.post("/api/users/forgotpassword", (0, validateResource_1.default)(user_schema_1.forgotPasswordSchema), user_controller_1.forgotPasswordHandler);
router.post("/api/users/resetpassword/:id/:passwordResetCode", (0, validateResource_1.default)(user_schema_1.resetPasswordSchema), user_controller_1.resetPasswordHandler);
router.get("/api/users/me", requireUser_1.default, user_controller_1.getCurrentUserHandler);
exports.default = router;
