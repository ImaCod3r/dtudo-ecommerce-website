import api from "../api/axios";

export async function login(token: string) {
    await api.post("/auth/google", { token });
}

export async function getUser() {
    const response = await api.get("/auth/me");
    return response.data.user;
}

export async function logoutUser() {
    await api.post("/auth/logout");
}

export async function updateUser(data: { name?: string; phone?: string; avatar?: string | File }) {
    let response;
    if (data.avatar instanceof File) {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.phone) formData.append('phone', data.phone);
        formData.append('avatar', data.avatar);
        response = await api.put("/users/profile/update", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    } else {
        response = await api.put("/users/profile/update", data);
    }
    return response.data;
}