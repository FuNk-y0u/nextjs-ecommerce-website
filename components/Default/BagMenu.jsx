import React from 'react'
import { Button, Drawer, rem, TextInput } from '@mantine/core'

import BagMenuItem from './BagMenuItem'
export default function BagMenu(props) {
  return (
    <Drawer position='right' onClose={props.onClose} opened={props.opened} title="Your Cart">
        <div className="h-full w-full flex flex-col gap-2 items-between">
            <div className="flex justify-between text-xs">
                <p>Products</p>
                <p>Total (NPR)</p>
            </div>
            <hr></hr>
            
            <BagMenuItem name="Amilo Lapsi Aachar Dipped In Sugar" price="640.0"></BagMenuItem>
            <BagMenuItem name="Amilo Lapsi Aachar" price="640.0"></BagMenuItem>
            <BagMenuItem name="Amilo Lapsi Aachar" price="640.0"></BagMenuItem>
            <BagMenuItem name="Amilo Lapsi Aachar" price="640.0"></BagMenuItem>
            <BagMenuItem name="Amilo Lapsi Aachar" price="640.0"></BagMenuItem>
            <hr></hr>
            <div className="flex justify-between items-center">
                <h1 className=''>Estimated Total</h1>
                <div className="flex gap-2 items-end">
                    <p className='text-sm font-light'>NPR</p>
                    <p className='text-2xl'> रु 1,200</p>
                </div>
                
            </div>
            <Button color='black'>Check out</Button>
            

        </div>
        
    </Drawer>
  )
}
