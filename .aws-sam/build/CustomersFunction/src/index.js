"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const customerRoutes_1 = require("./routes/customerRoutes");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const customerRoutes = new customerRoutes_1.CustomerRoutes();
const handler = async (event) => {
    try {
        console.log("Event received:", JSON.stringify(event));
        return customerRoutes.route(event);
    }
    catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error", error: error }),
        };
    }
};
exports.handler = handler;
