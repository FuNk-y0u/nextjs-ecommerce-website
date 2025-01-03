import TitleBackgroundImage from "@/public/pickled-cucumbers-glass-jars-blue-background.jpg";
import ProductItem from '@/components/Items/ProductItem';

import React, { useState } from 'react';

import axios from 'axios';
import { getEndpoint, endPoints} from '@/lib/pages';
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

async function addToCart(itemId){
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId
  });
}

export default function index({products}) {
  const items = products.items;
  const router = useRouter();
  return (
    <>
    <div className="h-96 flex items-center justify-center" id="head-bar" style={{
      backgroundImage: `url(${TitleBackgroundImage.src})`
    }}>
      <div className="flex items-center justify-center" id="head-bar-tint">
        <h1 className='text-5xl font-bold text-white'>Our Products.</h1>
      </div>
    </div>
    <div className="flex justify-center">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
          items.map((value) => {
            return <ProductItem key={value.id} id={value.id} router={router} name={value.name} price={value.price} image={value.image} addCart={() => {
              addToCart(value.id);
            }}/>
          })
        }
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps(){
  var result = await axios.post(getEndpoint(endPoints.getItem), {});
    if(!result.data.success){  
      console.log(result);
    }
    else{
    }
  return {props: {
    products: result.data
  }}
}
