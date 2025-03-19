import axios from 'axios';
import {BACKEND_URL} from "@/lib/contants";


export async function getPosts() {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlck9uZUBGbHV4LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQyMzQyMzM2LCJleHAiOjE3NDIzNDU5MzZ9.2gzWogUW1zU7nzGCQr5wy5woVj0UX23K22743Bwccqw";

    try {
        const data = await axios.get(BACKEND_URL +'/posts', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return data.data.data;
    } catch (e) {
        return {error: e}
    }
}