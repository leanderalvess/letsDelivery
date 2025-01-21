"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(body) {
    if (!body) {
        throw new Error("Request body is missing.");
    }
    try {
        return JSON.parse(body);
    }
    catch (error) {
        throw new Error("Invalid JSON format.");
    }
}
