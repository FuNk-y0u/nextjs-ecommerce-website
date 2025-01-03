
import { useEffect, useState } from "react";
import axios from "axios";


import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

import AdminNav from "@/components/Admin/AdminNav";
import OrdersPage from "@/components/Admin/OrdersPage";
import ProductsPage from "@/components/Admin/ProductsPage";
import { deleteCookie } from "cookies-next/client";

import {endPoints, getEndpoint} from "../../../lib/pages";


export default function dashboard() {
    const router = useRouter();

    const [pageIndex, setPageIndex] = useState(0);

    useEffect( () => {
        async function authenticate() {
            let token = getCookie("auth");
            var result = await axios.post(getEndpoint(endPoints.sesAdmin), {
                token: token
            });
            if(!result.data.success){
                router.push('/');
            }
        }
        authenticate();
    });

    return<>
        <div className="flex h-[100vh]">
            <AdminNav
            logout={() => {
                router.push('/admin');
                deleteCookie("auth");
            }}
            initPageIndex={pageIndex}
            onPageChange={(index)=>{
                setPageIndex(index);
            }}
            />
            <div className="w-full h-full overflow-y-scroll">
                {pageIndex == 0?<OrdersPage/>:<ProductsPage/>}
            </div>
        </div>
    </>
}
