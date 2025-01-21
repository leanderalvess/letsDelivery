import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CustomerService } from "../services/customerService";
import { validateRequest } from "../middleware/validateRequest";
import { CreateCustomerDTO, UpdateCustomerDTO } from "../dtos/customerDto";

export class CustomerRoutes {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    async route(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            const method = event.httpMethod;
            const path = event.path;

            if(!path.includes("/customers")) {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: "Route not found." }),
                }
            }

            if (method === "POST") {
                const body: CreateCustomerDTO = validateRequest<CreateCustomerDTO>(event.body);
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
                const body: UpdateCustomerDTO = validateRequest<UpdateCustomerDTO>(event.body);
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
        } catch (error: any) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message }),
            };
        }
    }
}