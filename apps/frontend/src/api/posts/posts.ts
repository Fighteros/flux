import axios from 'axios';
import {BACKEND_URL} from "@/lib/contants";


export async function getPosts() {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlck9uZUBGbHV4LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQyMzQ3MzU0LCJleHAiOjE3NDIzNTA5NTR9.YnJCHT30o739zSq4iyeBtqYuRR50vjNiX0VqoukmzQk";

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