
'use client'
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function dashboard() {
    const router = useRouter();
    useEffect( () => {
        async function authenticate() {
            let token = getCookie("auth");
            var result = await axios.post(`${process.env.NEXT_PUBLIC_SV_IP}/api/session`, {
                token: token
            });
            console.log(result);
            if(!result.data.success){
                router.push('/');
            }
        }
        authenticate();
    });
    return <h1>Hello Admin!</h1>
}
