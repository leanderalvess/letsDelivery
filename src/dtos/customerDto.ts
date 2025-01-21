export interface CreateCustomerDTO {
    id: string;
    name: string;
    dateOfBirth: string;
    isActive: boolean;
    addresses: string[];
    contacts: ContactDTO[];
}

export interface UpdateCustomerDTO {
    name?: string;
    isActive?: boolean;
    addresses?: string[];
    contacts?: ContactDTO[];
}

export interface ContactDTO {
    email: string;
    phone: string;
    isPrimary: boolean;
}
