import api from "../api/axios";
import type { CreateOrder } from "../types";

export async function createOrder(orderData: CreateOrder) {
    const response = await api.post("/orders/order/new", orderData);
    return response.data;
}

export async function getUserOrders() {
    const response = await api.get("/orders/user");
    return response.data;
}