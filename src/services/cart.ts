import api from "../api/axios";

export interface CartResponse {
    cart: any;
    error: boolean;
    message: string;
    cart_item: {
        id: number;
        cart_id: number;
        quantity: number;
        product: {
            id: string;
            name: string;
            price: number;
            description: string;
            category: string;
            public_id: string;
            image_url: string;
        };
    };
}

export async function getCart() {
    const response = await api.get('/carts/user/cart');
    return response.data;
}

export async function add(product_id: string, quantity: number = 1): Promise<CartResponse> {
    const response = await api.post('/carts/add', {
        product_id,
        quantity
    });
    return response.data;
}

export async function update(user_id: string, item_id: string, quantity: number) {
    const response = await api.put(`/carts/update/${item_id}`, {
        user_id,
        quantity
    });
    return response.data;
}

export async function remove(item_id: string) {
    const response = await api.delete(`/carts/remove/${item_id}`);
    return response.data;
}

export async function clear() {
await api.delete(`/carts/clear`);
}