import api from "../api/axios";
import type { Address } from "../types";

export async function createAddress(addressData: Address) {
    const response = await api.post("/addresses/new", addressData);
    return response.data;
}

export async function getAddresses() {
    const response = await api.get('/addresses/user');
    return response.data;
}

export async function deleteAddress(id: number) {
    await api.delete(`/addresses/address/${id}`);
}