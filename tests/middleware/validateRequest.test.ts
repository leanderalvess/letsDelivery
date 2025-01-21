import { validateRequest } from "../../src/middleware/validateRequest";

describe("validateRequest Middleware", () => {
    it("should parse valid JSON body", () => {
        const body = JSON.stringify({ key: "value" });
        const result = validateRequest(body);
        expect(result).toEqual({ key: "value" });
    });

    it("should throw error for invalid JSON", () => {
        const body = "{ invalidJson: }";
        expect(() => validateRequest(body)).toThrow("Invalid JSON format.");
    });

    it("should throw error if body is null", () => {
        expect(() => validateRequest(null)).toThrow("Request body is missing.");
    });
});
