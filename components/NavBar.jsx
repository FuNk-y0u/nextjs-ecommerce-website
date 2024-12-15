import { Button, rem, Indicator, Drawer, NavLink } from "@mantine/core";
import { IconHome, IconInfoCircle, IconList, IconMenu, IconShoppingBag } from "@tabler/icons-react";
import BagMenu from "./Default/BagMenu";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function NavBar(props) {
    const [CartOpened, { open, close }] = useDisclosure(false);
    const [openNav, setOpenNav] = useState(false);
    const router = useRouter();
    return <>
        <div className="flex bg-gray-50 h-20 items-center justify-around sticky top-0 shadow-md">
            <div className="md:hidden">
            <Button variant="transparent" onClick={()=>{setOpenNav(!openNav)}}>
                <IconMenu color="black"/>
            </Button>
            </div>
            
            <h1 className="text-xl font-semibold text-gray-700">Aamako.com.np</h1>
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
            <Indicator color='black' label="4" inline size={20}>
                <Button size="xs" variant="transparent" color="black" onClick={open}><IconShoppingBag stroke={1.0}/></Button>
            </Indicator>
        </div>
        <BagMenu opened={CartOpened} onClose={close} />
        <Drawer opened={openNav} size="100%" onClose={() => {
            setOpenNav(false)
        }}>
            <div className="flex flex-col h-[80vh] w-full justify-around">
                <h1 className="text-2xl font-semibold text-gray-700">Aamako.com.np</h1>

                <div className="flex flex-col gap-2 text-2xl">
                    <NavLink  color="black" label="Home" onClick={() => {
                        router.push('/');
                        setOpenNav(false);
                    }}/>
                    <NavLink  color="black" label="Items" onClick={
                        () => {
                            router.push('/items');
                            setOpenNav(false);
                        }
                    }/>
                    <NavLink  color="black" label="About Us" onClick={
                        () => {
                            router.push('/aboutus');
                            setOpenNav(false);
                        }
                    }/>
                </div>

                <div className="">
                    <Indicator color='black' label="4" inline size={20}>
                        <Button size="xs" variant="transparent" color="black" onClick={()=> {
                            setOpenNav(false)
                            open()
                        }}><IconShoppingBag stroke={1.0}/></Button>
                    </Indicator>
                </div>
                
            </div>

           
        </Drawer>
    </>
}