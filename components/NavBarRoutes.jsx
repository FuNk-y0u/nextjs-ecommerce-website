import React from 'react';
import { useRouter } from 'next/navigation';
import {NavLink } from "@mantine/core";

export default function NavBarRoutes(props) {
    const router = useRouter();

    if (!props.mob){
        return (
            <div className="text-sm hidden md:flex gap-10">
                <a className="hover:underline underline-offset-2 cursor-pointer" onClick={() => {
                    router.push('/');
                }}>Home</a>
                <a className="hover:underline underline-offset-2 cursor-pointer" onClick={ () => {
                    router.push('/items');
                }}>Items</a>
                <a className="hover:underline underline-offset-2 cursor-pointer" onClick={() => {
                    router.push('/aboutus');
                }}>About us</a>
            </div>
        );
    }
    else{
        return(
            <div className="flex flex-col gap-2 text-2xl">
                <NavLink  color="black" label="Home" onClick={
                    () => {
                        router.push('/');
                        props.closeNav();
                    }
                }/>
                <NavLink  color="black" label="Items" onClick={
                    () => {
                        router.push('/items');
                        props.closeNav();
                    }
                }/>
                <NavLink  color="black" label="About Us" onClick={
                    () => {
                        router.push('/aboutus');
                        props.closeNav();
                    }
                }/>
            </div>
        );
    }
}
