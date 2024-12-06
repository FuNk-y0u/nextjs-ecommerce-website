
import Head from "next/head";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { setCookie } from "cookies-next";

import { ColorSchemeScript } from '@mantine/core';
import { Button, TextInput } from '@mantine/core';
import { IconUserFilled } from '@tabler/icons-react';
import { IconAlertHexagon } from '@tabler/icons-react';
import { Loader } from '@mantine/core';

import {useState } from "react";


export default function Admin(){
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const validate_admin = async () => {
        setIsLoading(true);
        var result = await axios.post(`${process.env.NEXT_PUBLIC_SV_IP}/api/admin`, {
            password: password
        })
        if(result.status == 200){
            if(result.data.success == true){
                var token = result.data.token;
                setCookie("auth", token);
                setLoginError("");
                router.push("/admin/dashboard");
            }
            else{
               setLoginError(result.data.message);
            }
        }
        else{
            console.log("============ ERROR ============");
            console.log(result);
        }
        setIsLoading(false);
    }
    

    return <>
        <Head>
            <ColorSchemeScript />
        </Head>
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center w-96 gap-4">
                <IconUserFilled stroke={10} size={80}/>
                <div className="flex flex-col gap-2 w-full">
                    <TextInput
                        withAsterisk 
                        label="Admin Password"
                        type="password"
                        onChange={(event) => {
                            setPassword(event.currentTarget.value);
                        }}
                    />
                    <Button className="w-full" onClick={validate_admin}>
                        {
                            isLoading?<Loader color="white" size="sm"/>:"Login"
                        }
                    </Button>
                    <p className="flex items-center justify-center gap-2 text-red-500">
                        {
                            loginError?<IconAlertHexagon />:""
                        }
                        {
                            loginError?loginError:""
                        }
                    </p>
                </div>
            </div>
        </div>
    </>;
}
