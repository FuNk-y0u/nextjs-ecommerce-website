import React from 'react'
import { Button, Drawer, Indicator, rem, TextInput } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import StockPickleImage from "@/public/lemon-pickle-recipe.jpg";
import Image from 'next/image';
export default function BagMenuItem(props) {
  return (
        <div className="flex flex-col gap-5">
                <div className="w-full flex items-center justify-around gap-2">
                    <div className="border border-2 rounded-lg">
                    <Indicator color='black' label="4" inline size={20}>
                        <Image width="100" height="100" src={StockPickleImage}></Image>
                    </Indicator>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h3 className='text-sm text-ellipsis overflow-hidden w-32'>{props.name}</h3>
                        <p className='text-xs underline cursor-pointer'>Remove</p>
                    </div>
                    
                    <p className=''>रु {props.price}</p>
                </div>
            </div>
  )
}
