"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = require("express");
var game_model_1 = require("../models/game.model");
var requireUser_1 = require("../middleware/requireUser");
var gamesRouter = express_1.default.Router();
gamesRouter.get("/api/games", requireUser_1.default, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allGames, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, game_model_1.GameModel.find()];
            case 1:
                allGames = _a.sent();
                return [2 /*return*/, res.status(200).json(allGames)];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_1.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
gamesRouter.get("/api/games/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, game, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, game_model_1.GameModel.findById(id)];
            case 1:
                game = _b.sent();
                if (!game) {
                    return [2 /*return*/, res.status(404).send("Unable to find matching document with id: ".concat(id))];
                }
                return [2 /*return*/, res.status(200).json(game)];
            case 2:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(404).send("Unable to find matching document with id: ".concat(req.params.id))];
            case 3: return [2 /*return*/];
        }
    });
}); });
gamesRouter.post("/api/games", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newGame, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, game_model_1.GameModel.create(__assign({}, req.body))];
            case 1:
                newGame = _a.sent();
                if (!newGame) {
                    return [2 /*return*/, res.status(404).send("Unable to create a new game")];
                }
                return [2 /*return*/, res.status(200).json(newGame)];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(400).send(error_3.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
gamesRouter.put("/api/games/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, updatedGame, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, game_model_1.GameModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false } // Ensure options.useFindAndModify is set to false
                    )];
            case 1:
                updatedGame = _a.sent();
                if (!updatedGame) {
                    return [2 /*return*/, res.status(404).send("Unable to update. Game with id ".concat(id, " not found."))];
                }
                return [2 /*return*/, res.status(200).json(updatedGame)];
            case 2:
                error_4 = _a.sent();
                console.error(error_4.message);
                return [2 /*return*/, res.status(400).send(error_4.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
gamesRouter.delete("/api/games/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedGame, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, game_model_1.GameModel.findByIdAndRemove(id, { useFindAndModify: false })];
            case 1:
                deletedGame = _a.sent();
                if (!deletedGame) {
                    return [2 /*return*/, res.status(404).send("Unable to delete. Game with id ".concat(id, " not found."))];
                }
                return [2 /*return*/, res.status(200).json(deletedGame)];
            case 2:
                error_5 = _a.sent();
                console.error(error_5.message);
                return [2 /*return*/, res.status(400).send(error_5.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = gamesRouter;
