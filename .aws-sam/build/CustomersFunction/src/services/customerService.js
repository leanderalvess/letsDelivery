"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
// Service file: services/customerService.ts
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const TABLE_NAME = process.env.TABLE_NAME;
class CustomerService {
    constructor() {
        this.dbClient = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
    }
    async createCustomer(customer) {
        const param = {
            TableName: TABLE_NAME,
            Item: {
                id: { S: customer.id },
                name: { S: customer.name },
                dateOfBirth: { S: customer.dateOfBirth },
                isActive: { BOOL: customer.isActive },
                addresses: { L: customer.addresses.map((addr) => ({ S: addr })) },
                contacts: { L: customer.contacts.map(contact => ({ M: {
                            email: { S: contact.email },
                            phone: { S: contact.phone },
                            isPrimary: { BOOL: contact.isPrimary },
                        } })) },
            },
        };
        await this.dbClient.send(new client_dynamodb_1.PutItemCommand(param));
        return { message: "Customer created successfully." };
    }
    async getCustomerById(id) {
        const params = {
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
        };
        const result = await this.dbClient.send(new client_dynamodb_1.GetItemCommand(params));
        if (!result.Item) {
            return null;
        }
        const customer = {
            id: result.Item.id?.S || "",
            name: result.Item.name?.S || "",
            dateOfBirth: result.Item.dateOfBirth?.S || "",
            isActive: result.Item.isActive?.BOOL || false,
            addresses: result.Item.addresses?.L?.map(addr => addr.S || "") || [],
            contacts: result.Item.contacts?.L?.map(contact => ({
                email: contact?.M?.email?.S || "",
                phone: contact?.M?.phone?.S || "",
                isPrimary: contact?.M?.isPrimary?.BOOL || false,
            })) || [],
        };
        return customer;
    }
    async updateCustomer(id, updates) {
        const updateExpressions = [];
        const expressionAttributeNames = {};
        const expressionAttributeValues = {};
        if (updates.name) {
            updateExpressions.push("#name = :name");
            expressionAttributeNames["#name"] = "name";
            expressionAttributeValues[":name"] = { S: updates.name };
        }
        if (updates.isActive !== undefined) {
            updateExpressions.push("#isActive = :isActive");
            expressionAttributeNames["#isActive"] = "isActive";
            expressionAttributeValues[":isActive"] = { BOOL: updates.isActive };
        }
        const result = await this.dbClient.send(new client_dynamodb_1.UpdateItemCommand({
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
            UpdateExpression: `SET ${updateExpressions.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        }));
        return result.Attributes;
    }
    async deleteCustomer(id) {
        await this.dbClient.send(new client_dynamodb_1.DeleteItemCommand({
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
        }));
    }
}
exports.CustomerService = CustomerService;
