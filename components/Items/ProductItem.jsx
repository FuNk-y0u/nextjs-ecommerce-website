import React from 'react'
import Image from "next/image";
import pickleImg from "@/public/lemon-pickle-recipe.jpg"
import { Button } from '@mantine/core';

export default function ProductItem() {
  return (
    <div className="flex flex-col gap-2 hover:bg-stone-200 p-5 rounded-lg transition-colors " id="item-pannel">
        <div className="rounded-lg">
          <Image src={pickleImg} width="200" height="200" className='rounded-lg'></Image>
        </div>
        
        <p className='font-bold hover:underline underline-offset-2 cursor-pointer' id="item-name">Lapsi Ko Aachar</p>
        <p className='font-light'>रु  400</p>
        <Button color='black'>Add to cart</Button>
      </div>
  )
}
