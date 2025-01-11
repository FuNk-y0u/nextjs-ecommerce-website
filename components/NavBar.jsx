import { useState } from "react";

import Image from "next/image";

import { Button } from "@mantine/core";

import logo from "@/public/logo.jpg";

import CartDrawer from "./Default/CartDrawer";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";

function SearchButton(props) {
  if (!props.hide) {
    return (
      <Button variant="transparent" color="black" onClick={props.onClick}>
        <IconSearch></IconSearch>
      </Button>
    );
  } else {
    return <></>;
  }
}

function SiteLogo(props) {
  if (!props.hide) {
    return (
      <div
        className="flex items-center gap-2 justify-center cursor-pointer"
        onClick={props.onClick}
      >
        <Image src={logo} className="w-16"></Image>
      </div>
    );
  } else {
    <></>;
  }
}

function CartButton(props) {
  if (!props.hide) {
    return (
      <Button variant="transparent" color="black" onClick={props.onClick}>
        <IconShoppingCart />
      </Button>
    );
  } else {
    <></>;
  }
}

export default function NavBar(props) {
  const [openCart, setOpenCart] = useState(false);

  globalThis.openCart = () => {
    setOpenCart(true);
  };

  return (
    <>
      {/* NavBar Desktop */}
      <div className="flex bg-gray-50 h-20 items-center md:justify-around justify-between sticky top-0 shadow-md z-10 w-full p-2 md:p-0">
        <SearchButton />

        <SiteLogo />

        <CartButton
          hide={props.disableCart}
          onClick={() => {
            setOpenCart(true);
          }}
        />
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        opened={openCart}
        onClose={() => {
          setOpenCart(false);
        }}
      />
    </>
  );
}
