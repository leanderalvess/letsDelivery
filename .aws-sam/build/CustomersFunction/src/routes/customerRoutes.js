"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const customerService_1 = require("../services/customerService");
const validateRequest_1 = require("../middleware/validateRequest");
class CustomerRoutes {
    constructor() {
        this.customerService = new customerService_1.CustomerService();
    }
    async route(event) {
        try {
            const method = event.httpMethod;
            const path = event.path;
            if (!path.includes("/customers")) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: "Route not found." }),
                };
            }
            if (method === "POST") {
                const body = (0, validateRequest_1.validateRequest)(event.body);
                const result = await this.customerService.createCustomer(body);
                return {
                    statusCode: 201,
                    body: JSON.stringify(result),
                };
            }
            if (method === "GET") {
                const customerId = event.queryStringParameters?.id;
                if (!customerId) {
                    throw new Error("Customer ID is required.");
                }
                const result = await this.customerService.getCustomerById(customerId);
                return {
                    statusCode: 200,
                    body: JSON.stringify(result),
                };
            }
            if (method === "PUT") {
                const customerId = event.queryStringParameters?.id;
                if (!customerId) {
                    throw new Error("Customer ID is required.");
                }
                const body = (0, validateRequest_1.validateRequest)(event.body);
                const result = await this.customerService.updateCustomer(customerId, body);
                return {
                    statusCode: 200,
                    body: JSON.stringify(result),
                };
            }
            if (method === "DELETE") {
                const customerId = event.queryStringParameters?.id;
                if (!customerId) {
                    throw new Error("Customer ID is required.");
                }
                await this.customerService.deleteCustomer(customerId);
                return {
                    statusCode: 204,
                    body: "",
                };
            }
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Route not found." }),
            };
        }
        catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }
}
exports.CustomerRoutes = CustomerRoutes;
