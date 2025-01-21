export function validateRequest<T>(body: string | null): T {
    if (!body) {
        throw new Error("Request body is missing.");
    }

    try {
        return JSON.parse(body) as T;
    } catch (error) {
        throw new Error("Invalid JSON format.");
    }
}
