import api from "@/api/axios";


export async function getPosts({ page }: { page: number }) {


    try {
        const res = await api.get(`/posts?page=${page}`)

        return res.data;
    } catch (e) {
        return {error: e}
    }
}


export  const getPostById = async (id: number)  =>  {
    const res = await api.get(`/posts/${id}`)
    return res.data;
}