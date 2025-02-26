"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.privateFields = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var nanoid_1 = require("nanoid");
var argon2_1 = require("argon2");
var logger_js_1 = require("../utils/logger.js");
exports.privateFields = [
    "password",
    "__v",
    "verificationCode",
    "passwordResetCode",
    "verified",
];
var User = function () {
    var _classDecorators = [(0, typegoose_1.pre)("save", function () {
            return __awaiter(this, void 0, void 0, function () {
                var hash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.isModified("password")) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, argon2_1.default.hash(this.password)];
                        case 1:
                            hash = _a.sent();
                            this.password = hash;
                            return [2 /*return*/];
                    }
                });
            });
        }), (0, typegoose_1.index)({ email: 1 }), (0, typegoose_1.modelOptions)({
            schemaOptions: {
                timestamps: true,
            },
            options: {
                allowMixed: typegoose_1.Severity.ALLOW,
            },
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _firstName_decorators;
    var _firstName_initializers = [];
    var _lastName_decorators;
    var _lastName_initializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _verificationCode_decorators;
    var _verificationCode_initializers = [];
    var _passwordResetCode_decorators;
    var _passwordResetCode_initializers = [];
    var _verified_decorators;
    var _verified_initializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.email = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.firstName = __runInitializers(this, _firstName_initializers, void 0);
            this.lastName = __runInitializers(this, _lastName_initializers, void 0);
            this.password = __runInitializers(this, _password_initializers, void 0);
            this.verificationCode = __runInitializers(this, _verificationCode_initializers, void 0);
            this.passwordResetCode = __runInitializers(this, _passwordResetCode_initializers, void 0);
            this.verified = __runInitializers(this, _verified_initializers, void 0);
        }
        User_1.prototype.validatePassword = function (candidatePassword) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, argon2_1.default.verify(this.password, candidatePassword)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            e_1 = _a.sent();
                            logger_js_1.default.error(e_1, "Could not validate password");
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _email_decorators = [(0, typegoose_1.prop)({ lowercase: true, required: true, unique: true })];
        _firstName_decorators = [(0, typegoose_1.prop)({ required: true })];
        _lastName_decorators = [(0, typegoose_1.prop)({ required: true })];
        _password_decorators = [(0, typegoose_1.prop)({ required: true })];
        _verificationCode_decorators = [(0, typegoose_1.prop)({ required: true, default: function () { return (0, nanoid_1.nanoid)(); } })];
        _passwordResetCode_decorators = [(0, typegoose_1.prop)()];
        _verified_decorators = [(0, typegoose_1.prop)({ default: false })];
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: function (obj) { return "firstName" in obj; }, get: function (obj) { return obj.firstName; }, set: function (obj, value) { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: function (obj) { return "lastName" in obj; }, get: function (obj) { return obj.lastName; }, set: function (obj, value) { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _verificationCode_decorators, { kind: "field", name: "verificationCode", static: false, private: false, access: { has: function (obj) { return "verificationCode" in obj; }, get: function (obj) { return obj.verificationCode; }, set: function (obj, value) { obj.verificationCode = value; } }, metadata: _metadata }, _verificationCode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _passwordResetCode_decorators, { kind: "field", name: "passwordResetCode", static: false, private: false, access: { has: function (obj) { return "passwordResetCode" in obj; }, get: function (obj) { return obj.passwordResetCode; }, set: function (obj, value) { obj.passwordResetCode = value; } }, metadata: _metadata }, _passwordResetCode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _verified_decorators, { kind: "field", name: "verified", static: false, private: false, access: { has: function (obj) { return "verified" in obj; }, get: function (obj) { return obj.verified; }, set: function (obj, value) { obj.verified = value; } }, metadata: _metadata }, _verified_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
var UserModel = (0, typegoose_1.getModelForClass)(User);
exports.default = UserModel;
