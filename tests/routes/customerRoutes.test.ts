import { CustomerRoutes } from "../../src/routes/customerRoutes";
import { CustomerService } from "../../src/services/customerService";
import mockCustomer from '../mock/customer';

jest.mock("../../src/services/customerService");

describe("CustomerRoutes", () => {
    const mockService = new CustomerService();
    const customerRoutes = new CustomerRoutes();

    it("should handle POST /customers", async () => {
        const mockEvent = {
            httpMethod: "POST",
            path: "/customers",
            body: JSON.stringify(mockCustomer),
        };

        jest.spyOn(mockService, "createCustomer").mockResolvedValue({
            message: "Customer created successfully.",
        });

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(201);
    });

    it("should handle GET /customers", async () => {
        const mockEvent = {
            httpMethod: "GET",
            path: "/customers",
            queryStringParameters: { id: "1" }
        };

        jest.spyOn(mockService, "getCustomerById").mockResolvedValue({
            "id":"1",
            "name":"João Silva",
            "dateOfBirth":"1990-01-01",
            "isActive":true,
            "addresses":["Rua A, 123"],
            "contacts":[{
                "email":"joao@example.com",
                "phone":"999999999",
                "isPrimary":true
            }]
        });

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(200);
    });

    it("should handle invalid GET /customers", async () => {
        const mockEvent = {
            httpMethod: "GET",
            path: "/customers"
        };

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(400);
    });

    it("should handle PUT /customers", async () => {
        const mockEvent = {
            httpMethod: "PUT",
            path: "/customers",
            queryStringParameters: { id: "1" },
            body: JSON.stringify({ "name": "João Atualizado", "isActive": false}),
        };

        jest.spyOn(mockService, "updateCustomer").mockResolvedValue({
            isActive: false,
            name: "João Atualizado"
        });

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(200);
    });

    it("should handle invalid PUT /customers", async () => {
        const mockEvent = {
            httpMethod: "PUT",
            path: "/customers",
            body: JSON.stringify({ "name": "João Atualizado", "isActive": false}),
        };

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(400);
    });

    it("should handle DELETE /customers", async () => {
        const mockEvent = {
            httpMethod: "DELETE",
            path: "/customers",
            queryStringParameters: { id: "1" }
        };

        jest.spyOn(mockService, "deleteCustomer").mockResolvedValue();

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(204);
    });

    it("should handle invalid DELETE /customers", async () => {
        const mockEvent = {
            httpMethod: "DELETE",
            path: "/customers"
        };

        const response = await customerRoutes.route(mockEvent as any);
        expect(response.statusCode).toBe(400);
    });

    it("should handle invalid route", async () => {
        const mockEvent = {
            httpMethod: "ERROR",
            path: "/customers",
        };

        const response = await customerRoutes.route(mockEvent as any);

        expect(response.statusCode).toBe(404);
    });

    it("should handle error", async () => {
        const mockEvent = {
            httpMethod: "GET",
            path: "/invalid",
        };

        const response = await customerRoutes.route(mockEvent as any);

        expect(response.statusCode).toBe(404);
    });

    // 38,51,64,73-78
});
