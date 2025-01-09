import React from 'react';
import { useRouter } from 'next/navigation';
import {NavLink } from "@mantine/core";
import { IconChevronRight, IconHome, IconHome2, IconLayoutList, IconSmartHome } from '@tabler/icons-react';

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
                }}>Aachars</a>
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
                }
                leftSection ={
                    <IconSmartHome />
                }
                rightSection={
                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                }
                />
                <NavLink  color="black" label="Aachars"
                leftSection ={
                    <IconLayoutList></IconLayoutList>
                }
                 onClick={
                    () => {
                        router.push('/items');
                        props.closeNav();
                    }
                }
                
                rightSection={
                    <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
                }
                />
            </div>
        );
    }
}
