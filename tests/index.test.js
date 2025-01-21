"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe("Index Handler", () => {
    it("should route to the correct function", async () => {
        const mockEvent = {
            httpMethod: "GET",
            path: "/customers",
            queryStringParameters: { id: "123" },
        };
        const mockContext = {};
        const response = await (0, index_1.handler)(mockEvent, mockContext, (error) => {
            console.error('error', error);
        });
        expect(response?.statusCode).toBe(200);
        expect(response?.body).toBeDefined();
    });
    it("should return 404 for invalid routes", async () => {
        const mockEvent = {
            httpMethod: "POST",
            path: "/unknown",
        };
        const mockContext = {};
        const response = await (0, index_1.handler)(mockEvent, mockContext, (error) => {
            console.error('error', error);
        });
        expect(response?.statusCode).toBe(404);
    });
});
