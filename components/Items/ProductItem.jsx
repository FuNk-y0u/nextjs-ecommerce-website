import React from 'react'
import Image from "next/image";

import { Button } from '@mantine/core';

export default function ProductItem(props) {
  return (
    <div className="flex flex-col gap-2 hover:bg-stone-200 p-5 rounded-lg transition-colors " id="item-pannel">
        <div className="rounded-lg">
          <img src={props.image} width="200" height="200" className='rounded-lg'></img>
        </div>
        
        <p className='font-bold hover:underline underline-offset-2 cursor-pointer' id="item-name">{props.name}</p>
        <p className='font-light'>रु  {props.price}</p>
        <Button color='black' onClick={props.addCart}>Add to cart</Button>
      </div>
  )
}
