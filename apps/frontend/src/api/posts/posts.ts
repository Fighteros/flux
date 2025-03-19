import axios from 'axios';
import {BACKEND_URL} from "@/lib/contants";


type searchParams = {
    page?: number,
    limit?: number,
    search?: string,
    sort?: string,
    content?: string,
}

export async function getPosts({page, limit, search, sort, content}: searchParams) {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlck9uZUBGbHV4LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQyMzQ5MTQ3LCJleHAiOjE3NDIzNTI3NDd9.1fhGCasZsqn_EbFPGgmQ14wqK9wdBiHGfoii3_GSszk";

    try {
        const data = await axios.get(BACKEND_URL + `/posts?page=${page}&${limit}&${sort}&${content}}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return data.data.data;
    } catch (e) {
        return {error: e}
    }
}