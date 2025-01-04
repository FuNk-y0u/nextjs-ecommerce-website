import React, { useEffect, useState } from 'react'

import { BackgroundImage, Button, Drawer, Loader } from '@mantine/core'

import BagMenuItem from './BagMenuItem'

import { endPoints, getEndpoint } from '../../lib/pages';

import { getCookie } from 'cookies-next';
import axios from 'axios';


export default function BagMenu(props) {
    const [bagChanged, setBagChanged] = useState(false);
    const [items, setItems] = useState([]);

    const [totalCost, setTotalCost] = useState(0.0);

    const[isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getCart() {
            setIsLoading(true);
            var id = getCookie("cart-id")
            var result = await axios.post(getEndpoint(endPoints.getcartItems), {
                id: id
            })
            
            let tmpItems = result.data.items;
            tmpItems.sort(
                (a,b) => (a.id > b.id ? 1: -1)
            );
            setItems(tmpItems);
            setTotalCost(result.data.total);
            setIsLoading(false);
        }
        getCart();
        
    }
    ,
    [bagChanged, props.opened]
    )
    async function remove(itemId){
        setIsLoading(true);
        var id = getCookie("cart-id")
        var result = await axios.post(getEndpoint(endPoints.removecartItem), {
            id: id,
            itemId: itemId
        });
        setIsLoading(false);
        setBagChanged(!bagChanged);

    }
  return (
    <Drawer position='right' onClose={props.onClose} opened={props.opened} title="Your Cart">
        {
            items.length != 0?
            <div className="h-full w-full flex flex-col gap-2 items-between">
            <div className="flex justify-between text-xs">
                <p>Products</p>
                <p>Total (NPR)</p>
            </div>
            <hr></hr>
            {
                items.map((value) => {
                    return <BagMenuItem isLoading={isLoading} setIsLoading={setIsLoading} id={value.item.id} key={value.item.id} name={value.item.name} price={value.total} image={value.item.image} count={value.count} remove={() => {remove(value.item.id)}} setBagChanged={setBagChanged} bagChanged={bagChanged}></BagMenuItem>;
                })
            }
            
            
            <hr></hr>
            <div className="flex justify-between items-center">
                <h1 className=''>Estimated Total</h1>
                <div className="flex gap-2 items-end">
                    <p className='text-sm font-light'>NPR</p>
                    
                    <p className='text-2xl'> रु {totalCost}</p>
                </div>
                
            </div>
            
            <Button color='black'>{isLoading?<Loader size="xs" color='white'></Loader>:"Checkout"}</Button>
        </div>
        :
        <div className="flex flex-col gap-10 items-center justify-center w-full h-[80vh]">
            <h1 className='text-2xl font-bold'>Your bag is empty</h1>
            <Button color='black' size='lg' onClick={props.onClose}>Continue Shopping</Button>
        </div>
        
        }
        
        
    </Drawer>
  )
}
