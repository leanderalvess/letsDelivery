import { APIGatewayProxyHandler } from "aws-lambda";
import { CustomerRoutes } from "./routes/customerRoutes";
import { config } from "dotenv";

config();

const customerRoutes = new CustomerRoutes();

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        return customerRoutes.route(event);
    } catch (error) {
        console.error("Erro no processamento:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Erro interno", error: error }),
        };
    }
};