import api from "../api/axios";

export interface Address {
    id: number;
    user_id: string;
    city: string;
    street: string;
    number?: string;
    lat?: number;
    long?: number;
    phone?: string;
    created_at: string;
    updated_at: string;
}

export interface CreateAddressData {
    user_id: string;
    city: string;
    street: string;
    number?: string;
    lat?: number;
    long?: number;
    phone?: string;
}

export async function createAddress(addressData: CreateAddressData) {
    const response = await api.post("/addresses", addressData);
    return response.data;
}

export async function getAddresses(user_id: string) {
    const response = await api.get(`/addresses/user/${user_id}`);
    return response.data;
}
