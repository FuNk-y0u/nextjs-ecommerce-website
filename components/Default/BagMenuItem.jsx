import React, { useState } from "react";

import { getCookie } from "cookies-next";

import axios from "axios";

import { IconCircleMinus } from "@tabler/icons-react";

import { endPoints, getEndpoint } from "../../lib/pages";
import LoaderText from "../LoaderText";
import chgCartCount from "../../data/chgCartCount";

// Bad way to make timer global, but too bad
var timer = null;

export default function BagMenuItem(props) {
  const [count, setCount] = useState(Number(props.count));
  const [loading, setLoading] = useState(false);

  // Gets called to change item count
  async function changeCount(count) {
    setCount(count);
    clearTimeout(timer);
    timer = setTimeout(async () => {
      setLoading(true);
      await chgCartCount(getCookie("cart-id"), props.id, count, () => {
        console.log("====ERROR====");
        console.log(result);
      });
      await props.refreshCart();
    }, 500);
  }

  function DeleteButton() {
    return (
      <p className="text-xs underline cursor-pointer" onClick={props.remove}>
        <IconCircleMinus color="red" />
      </p>
    );
  }

  function ItemImage() {
    return <img width="100" height="100" src={props.image}></img>;
  }

  function ChangeCount(props) {
    return (
      <div className="flex gap-4 border items-center justify-center rounded-full p-2 border-slate-800">
        <button
          className="p-2"
          onClick={async () => {
            if (count > 1) {
              changeCount(count - 1);
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
          onClick={async () => {
            changeCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex items-center justify-around gap-2">
        {/* Other Details */}
        <DeleteButton />
        <ItemImage />

        {/* Cart details */}
        <div className="flex flex-col overflow-hidden gap-4">
          <h3 className="text-sm text-ellipsis overflow-hidden w-32 text-base font-bold hover:underline cursor-pointer">
            {props.name}
          </h3>
          <ChangeCount />
        </div>

        {/* Price details */}
        <p className="text-lg w-20 flex items-center justify-center">
          <LoaderText
            black={true}
            text={"रु " + props.price}
            loading={loading}
          />
        </p>
      </div>
    </div>
  );
}
