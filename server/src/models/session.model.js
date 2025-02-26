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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var typegoose_1 = require("@typegoose/typegoose");
var user_model_js_1 = require("./user.model.js");
var Session = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _valid_decorators;
    var _valid_initializers = [];
    return _a = /** @class */ (function () {
            function Session() {
                this.user = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _user_initializers, void 0));
                this.valid = __runInitializers(this, _valid_initializers, void 0);
            }
            return Session;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _user_decorators = [(0, typegoose_1.prop)({ ref: function () { return user_model_js_1.User; } })];
            _valid_decorators = [(0, typegoose_1.prop)({ default: true })];
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _valid_decorators, { kind: "field", name: "valid", static: false, private: false, access: { has: function (obj) { return "valid" in obj; }, get: function (obj) { return obj.valid; }, set: function (obj, value) { obj.valid = value; } }, metadata: _metadata }, _valid_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.Session = Session;
var SessionModel = (0, typegoose_1.getModelForClass)(Session, {
    schemaOptions: {
        timestamps: true,
    },
});
exports.default = SessionModel;
