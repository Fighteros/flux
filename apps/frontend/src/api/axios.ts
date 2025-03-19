import axios, {AxiosError, AxiosResponse} from 'axios';
import {accessToken, BACKEND_URL} from "@/lib/contants";


const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    },
});


export async function handle<T>(promise: Promise<AxiosResponse<T>>) {
    return promise
        .then((res) => [res, null] as const)
        .catch((err: AxiosError) => [null, err] as const);
}


// Add interceptor for Authorization tokens
export const setAuthToken = (token: string | null) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;