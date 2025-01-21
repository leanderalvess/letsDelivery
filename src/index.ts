import { APIGatewayProxyHandler } from "aws-lambda";
import { CustomerRoutes } from "./routes/customerRoutes";
import { config } from "dotenv";

config();

const customerRoutes = new CustomerRoutes();

export const handler: APIGatewayProxyHandler = async (event) => {
    return customerRoutes.route(event);
};