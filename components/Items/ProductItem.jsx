import React, { useEffect, useState } from 'react'
import Image from "next/image";

import { Button, Loader } from '@mantine/core';

export default function ProductItem(props) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-2 p-5 transition-colors justify-between items-center border-2 rounded-md" id="item-pannel">
      <img src={props.image} width="200" height="200" className='rounded-md'></img>
        <div className="w-full">
          <p className='font-bold hover:underline underline-offset-2 cursor-pointer text-xl' onClick={() => {
            props.router.push(`items/${props.id}`)
          }}>{props.name}</p>
          <p className='font-light'>रु  {props.price}</p>
        </div>
        
        <div className="flex flex-col w-full">
          <Button color='black' onClick={
            // ! Find a better solution for this shit!
            // ! Calling a function already defined
            async () =>{
              setLoading(true);
              await props.addCart();
              setLoading(false);
              props.openBagDrawer();
            }
            
          }>{loading?<Loader size="xs" color='white'></Loader>:"Add to cart"}</Button>
        </div>
        
      </div>
  )
}
