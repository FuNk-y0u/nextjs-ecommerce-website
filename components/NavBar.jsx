import { useState } from "react";

import BagMenu from "./Default/BagMenu";
import NavBarRoutes from "./NavBarRoutes";
import NavBarLogo from "./NavBarLogo";

import { Button, Drawer} from "@mantine/core";
import { IconMenu, IconShoppingBag } from "@tabler/icons-react";

import logo from "@/public/logo.jpg";
import Image from "next/image";
function NavButton(props){
    return (
        <div className="md:hidden">
            <Button variant="transparent" onClick={props.openNav}>
                <IconMenu color="black"/>
            </Button>
        </div>
    );
}

function CartButton(props){
    return (
        <Button size="xs" variant="transparent" color="black" onClick={props.openCart}>
            <IconShoppingBag stroke={1.0}/>
        </Button>
    );
}

export default function NavBar(props) {
    const [openCart, setOpenCart] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    globalThis.openCart = () => {
        setOpenCart(true);
    }
    return <>

        {/* NavBar Desktop */}
        <div className="flex bg-gray-50 h-20 items-center justify-around sticky top-0 shadow-md z-10 w-full">

            {/* Navbar button for mobile */}
            <NavButton openNav={()=>{setOpenNav(true)}}/>
            
            {/* Aacahr web */}
            <div className="flex items-center gap-2 justify-center">
                <Image src={logo} className="w-16"></Image>
                
                <NavBarLogo name="Ama Kashi Achaar"/>
            </div>
            

            {/* Home Items Aboutus Page Links */}
            <NavBarRoutes/>

            {/* Cart button */}
            {
                props.disableCart?
                "":
                <CartButton openCart={() => {
                    setOpenNav(false);
                    setOpenCart(true);
                }}/>
            }
            

        </div>

        
        {/* Cart Drawer */}
        <BagMenu opened={openCart} onClose={()=>{setOpenCart(false)}} />
        
        {/* Mobile Navbar */}
        <Drawer opened={openNav} size="100%" onClose={() => {
            setOpenNav(false)
        }}>
            <div className="flex flex-col h-[80vh] w-full justify-around">

                {/* Aachar Web */}
                <Image src={logo} className="w-16"></Image>

                {/* Home Items Aboutus Page Links */}
                <NavBarRoutes mob={true} closeNav={()=>{setOpenNav(false)}}/>

                {/* Cart Button */}
                <div className="">
                    {
                        props.disableCart?
                        "":
                        <CartButton openCart={() => {
                            setOpenNav(false);
                            setOpenCart(true);
                        }}/>
                    }
                    
                </div>
            </div>
        </Drawer>
    </>
}