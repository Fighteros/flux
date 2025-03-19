import axios from 'axios';
import {accessToken, BACKEND_URL} from "@/lib/contants";


const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
});

// Add interceptor for Authorization tokens
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;