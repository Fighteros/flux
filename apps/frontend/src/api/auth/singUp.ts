'use client'

import {SignUpUser} from "@/lib/types/modelTypes";
import axios, {handle} from "@/api/axios";
import {redirect} from "next/navigation";

export const singUp = async (payload: SignUpUser) => {
    const [res, error] = await handle(axios.post('/users', payload))
    if (error) return error

    return res;
}