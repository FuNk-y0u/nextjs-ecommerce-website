import TitleBackgroundImage from "@/public/items.jpg";
import ProductItem from "@/components/Items/ProductItem";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { getEndpoint, endPoints } from "@/lib/pages";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button, Loader } from "@mantine/core";

import getItems from "../../data/getItems";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId,
  });
}

export default function index() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getitems() {
    var result = await getItems();
    setItems(result);
    setLoading(false);
  }
  useEffect(() => {
    getitems();
  }, []);

  const router = useRouter();
  return (
    <>
      <div
        className="h-60 flex items-center justify-center"
        id="head-bar"
        style={{
          backgroundImage: `url(${TitleBackgroundImage.src})`,
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-2"
          id="head-bar-tint"
        >
          <h1 className="text-6xl font-bold text-white">All Items</h1>
        </div>
      </div>
      <div className="flex flex-col items-center py-4 gap-4">
        <div className="flex flex-col w-auto gap-2">
          <div className="item-grid pb-10">
            {loading ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader size="md" color="black"></Loader>
              </div>
            ) : (
              items.map((value) => {
                return (
                  <ProductItem
                    key={value.id}
                    id={value.id}
                    router={router}
                    name={value.name}
                    price={value.price}
                    image={value.image}
                    addCart={async () => {
                      await addToCart(value.id);
                    }}
                    openBagDrawer={globalThis.openCart}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
