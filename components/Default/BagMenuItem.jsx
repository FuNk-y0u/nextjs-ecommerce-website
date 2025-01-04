import { Indicator, Loader } from '@mantine/core';
import { IconCircleMinus, IconCross } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { endPoints, getEndpoint } from '../../lib/pages';
import { getCookie } from 'cookies-next';


var timer = null;
export default function BagMenuItem(props) {
    const [count, setCount] = useState(Number(props.count));
    const [isLoading, setIsLoading] = useState(false);
    useEffect(
        () => {
            clearTimeout(timer);
            
            timer = setTimeout(async ()=>{
                let result = await axios.post(getEndpoint(endPoints.changeitemCount),{
                    id: getCookie("cart-id"),
                    itemId: props.id,
                    itemCount: count
                });
                props.setBagChanged(!props.bagChanged);
            }, 500);            
        },
        [count]
    )
  return (
        <div className="flex flex-col gap-5">
                <div className="w-full flex items-center justify-around gap-2">
                <p className='text-xs underline cursor-pointer' onClick={props.remove}><IconCircleMinus color='red'/></p>
                    
                    <img width="100" height="100" src={props.image}></img>
                    
                    
                    <div className="flex flex-col overflow-hidden gap-4">
                        <h3 className='text-sm text-ellipsis overflow-hidden w-32 text-base font-bold hover:underline cursor-pointer'>{props.name}</h3>
                        <div className="flex gap-4 border items-center justify-center rounded-full p-2 border-slate-800">
                            <button className='p-2' onClick={
                                () => {
                                    if(count > 1){
                                        setCount(count - 1);
                                    }
                                    else{

                                    }
                                    
                                }
                                
                            }>-</button>
                            <input className='w-10 text-center' type='number' value={count} onChange={e => setCount(Number(e.target.value))}></input>
                            <button className='p-2' onClick={
                                () => {
                                    setCount(count + 1);
                                }
                                
                            }>+</button>
                        </div>
                    </div>
                    <p className='text-lg'>रु {isLoading?<Loader size="xs" color='black'></Loader>:props.price}</p>
                </div>
            </div>
  );
}
