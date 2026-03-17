"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch(err => res.status(500).json({ status: false, message: err.message }));
exports.asyncHandler = asyncHandler;
