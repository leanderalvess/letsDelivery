"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest_1 = require("../../src/middleware/validateRequest");
describe("validateRequest Middleware", () => {
    it("should parse valid JSON body", () => {
        const body = JSON.stringify({ key: "value" });
        const result = (0, validateRequest_1.validateRequest)(body);
        expect(result).toEqual({ key: "value" });
    });
    it("should throw error for invalid JSON", () => {
        const body = "{ invalidJson: }";
        expect(() => (0, validateRequest_1.validateRequest)(body)).toThrow("Invalid JSON format.");
    });
    it("should throw error if body is null", () => {
        expect(() => (0, validateRequest_1.validateRequest)(null)).toThrow("Request body is missing.");
    });
});
