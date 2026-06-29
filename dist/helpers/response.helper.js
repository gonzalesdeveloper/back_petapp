"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        status: true,
        message,
        data
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, message, statusCode = 500, data = null) => {
    return res.status(statusCode).json({
        status: false,
        message,
        data
    });
};
exports.errorResponse = errorResponse;
