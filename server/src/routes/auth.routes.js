"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller"); // import relevant handlers 
var validateResource_1 = require("../middleware/validateResource"); // import middleware for validating inputs from login form
var auth_schema_1 = require("../schemas/auth.schema"); // import schema for creating a session 
var router = express_1.default.Router(); // import the express router
// requests for the router (GET, POST, PUT, DELETE)
router.post("/api/sessions", (0, validateResource_1.default)(auth_schema_1.createSessionSchema), auth_controller_1.createSessionHandler); // Create a Session on User Login
router.post("/api/sessions/refresh", auth_controller_1.refreshAccessTokenHandler); // handle maintaining user session on page refresh
exports.default = router;
