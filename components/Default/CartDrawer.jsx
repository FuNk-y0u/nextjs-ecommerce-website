import React, { useEffect, useState } from "react";

import { getCookie } from "cookies-next";

import { Button, Drawer } from "@mantine/core";

import delCartItem from "../../data/delCartItems";
import getCartItems from "../../data/getCartItems";

import LoaderText from "../LoaderText";
import BagMenuItem from "./BagMenuItem";

export default function CartDrawer(props) {
  const [items, setItems] = useState([]);

  const [totalCost, setTotalCost] = useState(0.0);

  const [isLoading, setIsLoading] = useState(false);

  // Gets cart items and sets their use state values
  async function refreshCart() {
    const [tempItems, total] = await getCartItems(
      getCookie("cart-id"),
      (result) => {
        console.log("====ERROR====");
        console.log(result);
      }
    );

    tempItems.sort((a, b) => (a.id > b.id ? 1 : -1));

    setItems(tempItems);
    setTotalCost(total);

    setIsLoading(false);
  }

  // Sends delete cart item request
  async function delCart(itemId) {
    setIsLoading(true);

    await delCartItem(getCookie("cart-id"), itemId, (result) => {
      console.log("====ERROR====");
      console.log(result);
    });

    // Refresh cart
    refreshCart();
  }

  // Message for empty cart
  function EmptyCartBody() {
    return (
      <div className="flex flex-col gap-10 items-center justify-center w-full h-[80vh]">
        <h1 className="text-2xl font-bold">Your bag is empty</h1>
        <Button color="black" size="lg" onClick={props.onClose}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  function RenderCartItems() {
    const mappedItems = [];
    items.map((value) => {
      mappedItems.push(
        <BagMenuItem
          id={value.item.id}
          key={value.item.id}
          name={value.item.name}
          price={value.total}
          image={value.item.image}
          count={value.count}
          remove={() => {
            delCart(value.item.id);
          }}
          refreshCart={refreshCart}
        ></BagMenuItem>
      );
    });
    return mappedItems;
  }

  function TotalSection() {
    return (
      <>
        <hr></hr>
        <div className="flex justify-between items-center">
          <h1 className="">Estimated Total</h1>
          <div className="flex gap-2 items-end">
            <p className="text-sm font-light">NPR</p>
            <p className="text-2xl"> रु {totalCost}</p>
          </div>
        </div>
      </>
    );
  }

  function HeaderSection() {
    return (
      <>
        <div className="flex justify-between text-xs">
          <p>Products</p>
          <p>Total (NPR)</p>
        </div>
        <hr></hr>
      </>
    );
  }

  // Function for the checkout button
  function onCheckout() {
    // Do nothing if theres smth loading
    isLoading
      ? () => {}
      : () => {
          props.onClose();
          globalThis.router.push("/checkout");
        };
  }

  // Regular cart body
  function RegCartBody() {
    return (
      <div className="h-full w-full flex flex-col gap-2 items-between">
        <HeaderSection />
        <RenderCartItems />
        <TotalSection />
        <Button color="black" onClick={onCheckout}>
          <LoaderText loading={isLoading} text="Checkout" />
        </Button>
      </div>
    );
  }

  useEffect(() => {
    refreshCart();
  }, [props.opened]);

  // * MAIN RETURN
  return (
    <Drawer
      position="right"
      onClose={props.onClose}
      opened={props.opened}
      title="Your Cart"
    >
      {items.length != 0 ? <RegCartBody /> : <EmptyCartBody />}
    </Drawer>
  );
}
