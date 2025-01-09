import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { endPoints, getEndpoint } from '../../lib/pages';
import { Button, Loader } from '@mantine/core';
import { getCookie } from 'cookies-next';

async function addToCart(itemId){
  let id = getCookie("cart-id");
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: id,
    itemId: itemId
  });
}

export default function item({item}) {
    const [pitem, setItem] = useState(item);
    const [loading, setLoading] = useState(false);
  return (
    <div className='flex md:flex-row flex-col w-full h-full items-center justify-center gap-6 p-10'>
        <img src={pitem.image} className='w-96 h-96 rounded-lg'></img>
        <div className="flex flex-col gap-3 w-96">
            <h1 className='text-4xl font-bold'>{pitem.name}</h1>
            <div className="flex gap-2">
                <p className='text-xl font-light'>NPR</p>
                <p className='text-xl'>रु {pitem.price}</p>
            </div>
            
            <Button color='black' onClick={async () => {
                setLoading(true);
                await addToCart(pitem.id);
                setLoading(false);
                globalThis.openCart();
            }}>{loading?<Loader size="xs" color='white'></Loader>:"Add to cart"}</Button>
            <p className=''>{pitem.description}</p>
        </div>
    </div>
  )
}

export async function getServerSideProps({params}){
    var result = await axios.post(getEndpoint(endPoints.getitemId), {id: params.id});
    return {
        props: {
            item: result.data.items[0]
        }
    }
}