"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utility for logging alerts to the console (typescript)
var pino_1 = require("pino");
var dayjs_1 = require("dayjs");
var config_1 = require("config");
var level = config_1.default.get("logLevel");
var log = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
    },
    level: level,
    base: {
        pid: false,
    },
    timestamp: function () { return ",\"time\":\"".concat((0, dayjs_1.default)().format(), "\""); },
});
exports.default = log;
