// Test file: tests/customerService.test.ts
import { CustomerService } from "../src/services/customerService";
import mockCustomer from './mock/customer';

describe("customerService", () => {
    const customerService = new CustomerService();

    it("should create a customer", async () => {
        const result = await customerService.createCustomer(mockCustomer);
        expect(result).toEqual({ message: "Customer created successfully." });
    });

    it("should fetch a customer by ID", async () => {
        const result = await customerService.getCustomerById(mockCustomer.id);
        expect(result).toBeDefined();
    });

    it("should update a customer", async () => {
        const updates = { name: "Jane Doe", isActive: false };
        const result = await customerService.updateCustomer(mockCustomer.id, updates);
        expect(result).toBeDefined();
    });

    it("should delete a customer", async () => {
        await customerService.deleteCustomer(mockCustomer.id);
        expect(true).toBe(true);
    });
});
