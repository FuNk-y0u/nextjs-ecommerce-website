import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { endPoints, getEndpoint } from "../../lib/pages";
import { Button, Loader } from "@mantine/core";
import { getCookie } from "cookies-next";

async function addToCart(itemId) {
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId,
  });
}

export default function item({ item }) {
  const [count, setCount] = useState(1);
  const [pitem, setItem] = useState(item);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="flex md:flex-row flex-col w-full h-full md:items-start items-center justify-center gap-6 md:p-10">
        <img
          src={pitem.image}
          className="w-full sm:w-96 sm:h-96 sm:rounded-lg"
        ></img>
        <div className="flex flex-col gap-3 w-96">
          <h1 className="text-4xl font-bold">{pitem.name}</h1>
          <div className="flex gap-2">
            <p className="text-xl font-light">NPR</p>
            <p className="text-xl">रु {pitem.price}</p>
          </div>
          <div className="flex gap-4 border items-center justify-center rounded-full p-2 border-slate-800 w-64">
            <button
              className="p-2"
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                } else {
                }
              }}
            >
              -
            </button>
            <input
              className="w-10 text-center"
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            ></input>
            <button
              className="p-2"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="hidden sm:flex flex-col w-full gap-2">
            <Button
              color="black"
              radius="xs"
              size="md"
              onClick={async () => {
                setLoading(true);
                await addToCart(pitem.id);
                setLoading(false);
                globalThis.openCart();
              }}
            >
              {loading ? (
                <Loader size="xs" color="white"></Loader>
              ) : (
                "Add To Cart"
              )}
            </Button>
            <Button
              color="black"
              radius="xs"
              size="md"
              variant="outline"
              onClick={async () => {
                setLoading(true);
                await addToCart(pitem.id);
                setLoading(false);
                globalThis.openCart();
              }}
            >
              {loading ? <Loader size="xs" color="white"></Loader> : "Buy Now"}
            </Button>
          </div>
          <p className="">{pitem.description}</p>
        </div>
      </div>
      <div className="sm:hidden sticky bottom-0 w-full flex bg-white p-2 gap-2">
        <div className="flex flex-col w-full">
          <Button
            color="black"
            radius="xs"
            size="md"
            onClick={async () => {
              setLoading(true);
              await addToCart(pitem.id);
              setLoading(false);
              globalThis.openCart();
            }}
          >
            {loading ? (
              <Loader size="xs" color="white"></Loader>
            ) : (
              "Add To Cart"
            )}
          </Button>
        </div>
        <div className="flex flex-col w-full">
          <Button
            color="black"
            radius="xs"
            size="md"
            variant="outline"
            onClick={async () => {
              setLoading(true);
              await addToCart(pitem.id);
              setLoading(false);
              globalThis.openCart();
            }}
          >
            {loading ? <Loader size="xs" color="white"></Loader> : "Buy Now"}
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  var result = await axios.post(getEndpoint(endPoints.getitemId), {
    id: params.id,
  });
  return {
    props: {
      item: result.data.items[0],
    },
  };
}
