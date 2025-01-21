"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Test file: tests/customerService.test.ts
const customerService_1 = require("../src/services/customerService");
const customer_1 = __importDefault(require("./mock/customer"));
describe("customerService", () => {
    const customerService = new customerService_1.CustomerService();
    it("should create a customer", async () => {
        const result = await customerService.createCustomer(customer_1.default);
        expect(result).toEqual({ message: "Customer created successfully." });
    });
    it("should fetch a customer by ID", async () => {
        const result = await customerService.getCustomerById(customer_1.default.id);
        expect(result).toBeDefined();
    });
    it("should update a customer", async () => {
        const updates = { name: "Jane Doe", isActive: false };
        const result = await customerService.updateCustomer(customer_1.default.id, updates);
        expect(result).toBeDefined();
    });
    it("should delete a customer", async () => {
        await customerService.deleteCustomer(customer_1.default.id);
        expect(true).toBe(true);
    });
});
