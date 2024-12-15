import React from 'react'
import { Button, Drawer, Indicator, rem, TextInput } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
export default function BagMenuItem(props) {
  return (
        <div className="flex flex-col gap-5">
                <div className="w-full flex items-center justify-around gap-2">
                    <div className="border border-2 rounded-lg">
                    <Indicator color='black' label="4" inline size={20}>
                        <img width={100} height={100} src='https://lh3.googleusercontent.com/L3xNnYxY4n4dI2hv9WX-MFJ7jW-YTl8CPv5gxV3zNwEYj3bA4If_6dzzLD7BGm3JyC_m7jV5KkZ_ox-PcrW8Dh1HTOfkvUMf6G2EigQb_c9_aEyr=w1280'></img>
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
