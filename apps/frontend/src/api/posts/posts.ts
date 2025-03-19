import {BACKEND_URL} from "@/lib/contants";


export async function getPosts({ page }: { page: number }) {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidXNlck9uZTFARmx1eC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MjM1NDYyOSwiZXhwIjoxNzQyMzU4MjI5fQ.n0IIsnT9ZeC1E6DGxVlTdkXAAIgOcX0TNH8IhVsnR0k";

    try {
        const data = await fetch(BACKEND_URL + `/posts?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return data.json()
    } catch (e) {
        return {error: e}
    }
}