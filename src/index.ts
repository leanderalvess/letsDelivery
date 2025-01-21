import { APIGatewayProxyHandler } from "aws-lambda";
import { CustomerRoutes } from "./routes/customerRoutes";
import { config } from "dotenv";

config();

const customerRoutes = new CustomerRoutes();

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        console.log("Event received:", JSON.stringify(event));

        return customerRoutes.route(event);
    } catch (error) {
        console.error("Error:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Internal Server Error", error: error }),
        };
    }
};