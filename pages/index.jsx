import TitleBackgroundImage from "@/public/home_image.jpg";
import ProductItem from "@/components/Items/ProductItem";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { getEndpoint, endPoints } from "@/lib/pages";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Button, Loader } from "@mantine/core";
import getBestSeller from "../data/getBestSeller";
import getForYou from "../data/getForYou";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId,
  });
}

export default function index() {
  const [bestSellerItems, setBestSellerItems] = useState([]);
  const [forYouItems, setForYouItems] = useState([]);
  const [loadingBestSeller, setLoadingBestSeller] = useState(true);
  const [loadingForYou, setLoadingForYou] = useState(true);
  async function getitems() {
    var result = await getBestSeller();
    setBestSellerItems(result);
    setLoadingBestSeller(false);
    result = await getForYou();
    setForYouItems(result);
    setLoadingForYou(false);
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
          <h1 className="text-6xl font-bold text-white">Ama Kashi</h1>
          <Button variant="outline" color="white">
            {"About us >"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center py-4 gap-4">
        <div className="flex flex-col w-auto gap-2">
          <div className="flex justify-between w-full px-4">
            <h1 className="text-3xl">For you</h1>
            <a
              className="underline text-gray-800 underline-offset-4"
              href="/items"
            >
              View all
            </a>
          </div>

          <div className="item-grid pb-10">
            {loadingForYou ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader size="md" color="black"></Loader>
              </div>
            ) : (
              forYouItems.map((value) => {
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
          <div className="flex justify-between w-full px-4">
            <h1 className="text-3xl">Best sellers</h1>
            <a
              className="underline text-gray-800 underline-offset-4"
              href="/items"
            >
              View all
            </a>
          </div>
          <div className="item-grid">
            {loadingBestSeller ? (
              <div className="flex w-full h-full items-center justify-center">
                <Loader size="md" color="black"></Loader>
              </div>
            ) : (
              bestSellerItems.map((value) => {
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
