// Service file: services/customerService.ts
import { DynamoDBClient, PutItemCommand, GetItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { CreateCustomerDTO, UpdateCustomerDTO } from "../dtos/customerDto";

const TABLE_NAME = process.env.TABLE_NAME;

export class CustomerService {
    private dbClient: DynamoDBClient;

    constructor() {
        this.dbClient = new DynamoDBClient({ region: process.env.AWS_REGION });
    }

    async createCustomer(customer: CreateCustomerDTO): Promise<{ message: string }> {
        const param = {
            TableName: TABLE_NAME,
            Item: {
                id: { S: customer.id },
                name: { S: customer.name },
                dateOfBirth: { S: customer.dateOfBirth },
                isActive: { BOOL: customer.isActive },
                addresses: { L: customer.addresses.map((addr: string) => ({ S: addr })) },
                contacts: { L: customer.contacts.map(contact => ({ M: {
                    email: { S: contact.email },
                    phone: { S: contact.phone },
                    isPrimary: { BOOL: contact.isPrimary },
                } })) },
            },
        }

        await this.dbClient.send(new PutItemCommand(param));
        return { message: "Customer created successfully." };
    }

    async getCustomerById(id: string): Promise<CreateCustomerDTO | null> {
        const params = {
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
        };

        const result = await this.dbClient.send(new GetItemCommand(params));
        if (!result.Item) {
            return null;
        }

        const customer: CreateCustomerDTO = {
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

    async updateCustomer(id: string, updates: UpdateCustomerDTO): Promise<UpdateCustomerDTO> {
        const updateExpressions = [];
        const expressionAttributeNames: Record<string, string> = {};
        const expressionAttributeValues: Record<string, any> = {};

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

        const result = await this.dbClient.send(new UpdateItemCommand({
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
            UpdateExpression: `SET ${updateExpressions.join(", ")}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",
        }));
        return result.Attributes as UpdateCustomerDTO;
    }

    async deleteCustomer(id: string): Promise<void> {
        await this.dbClient.send(new DeleteItemCommand({
            TableName: TABLE_NAME,
            Key: { id: { S: id } },
        }));
    }
}
