import { Indicator } from '@mantine/core'
import React from 'react'

export default function CheckoutItem(props) {
  return (
    <div className="flex items-center justify-between gap-2 w-96">
        <Indicator inline label={props.count} size={24} color="black">
            <img width="100" height="100" src={props.image}></img>
        </Indicator>
        <p>{props.name}</p>
        <div className="flex gap-2">
            <p className='font-light'>NPR</p> 
            <p className='font-medium'>रु {props.price}</p>   
        </div>
    </div>
  )
}
