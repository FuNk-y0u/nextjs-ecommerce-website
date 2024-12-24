import { Indicator } from '@mantine/core';
import React from 'react'

export default function BagMenuItem(props) {
  return (
        <div className="flex flex-col gap-5">
                <div className="w-full flex items-center justify-around gap-2">
                    <Indicator size="lg" radius="sm" label={props.count} color='black'>
                        <img width="100" height="100" src={props.image}></img>
                    </Indicator>
                    
                    <div className="flex flex-col overflow-hidden">
                        <h3 className='text-sm text-ellipsis overflow-hidden w-32'>{props.name}</h3>
                        <p className='text-xs underline cursor-pointer' onClick={props.remove}>Remove</p>
                    </div>
                    <p className=''>रु {props.count * props.price}</p>
                </div>
            </div>
  );
}
