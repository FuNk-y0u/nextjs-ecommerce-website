import TitleBackgroundImage from "@/public/pickled-cucumbers-glass-jars-blue-background.jpg";
import ProductItem from '@/components/Items/ProductItem';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { getEndpoint, endPoints} from '@/lib/pages';
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";

async function addToCart(itemId){
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId
  });
}

export default function index() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getitems() {
      var result = await axios.post(getEndpoint(endPoints.getItem), {});
      if(!result.data.success){  
        console.log(result);
      }
      else{
        console.log(result);
        setItems(result.data.items);
        setLoading(false);
      }
      
    }
    getitems();
  }, []);
  
  const router = useRouter();
  return (
    <>
    <div className="h-64 flex items-center justify-center" id="head-bar" style={{
      backgroundImage: `url(${TitleBackgroundImage.src})`
    }}>
      <div className="flex items-center justify-center" id="head-bar-tint">
        <h1 className='text-5xl font-bold text-white'>Our Products.</h1>
      </div>
    </div>
    <div className="flex justify-center m-4">
      <div className="md:w-[60%]">
        {
          loading?
          <div className="flex items-center justify-center">
            <Loader color="black"></Loader>
          </div>:
          <div className='item-grid'>
            {
              items.map((value) => {
                return <ProductItem key={value.id} id={value.id} router={router} name={value.name} price={value.price} image={value.image} addCart={() => {
                  addToCart(value.id);
                }}/>
              })
            }
          </div>
        }
      </div>
    </div>

    </>
  )
}
