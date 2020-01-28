"use strict";
/* eslint-disable max-classes-per-file */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, code, status, data) {
        if (code === void 0) { code = 'INTERNAL_ERROR'; }
        if (status === void 0) { status = 500; }
        if (data === void 0) { data = {}; }
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.code = code;
        _this.status = status;
        _this.data = data;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
