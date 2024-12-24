import React, { useEffect, useState } from 'react'

import { BackgroundImage, Button, Drawer } from '@mantine/core'

import BagMenuItem from './BagMenuItem'

import { endPoints, getEndpoint } from '../../lib/pages';

import { getCookie } from 'cookies-next';
import axios from 'axios';


export default function BagMenu(props) {
    const [bagChanged, setBagChanged] = useState(false);
    const [items, setItems] = useState([]);

    const [totalCost, setTotalCost] = useState(0.0);
    var tmp = 0.0;

    useEffect(() => {
        async function getCart() {
            var id = getCookie("cart-id")
            var result = await axios.post(getEndpoint(endPoints.getcartItems), {
                id: id
            })
            console.log(result);
            setItems(result.data.items);
        }
        getCart();
        
    }
    ,
    [bagChanged, props.opened]
    )
    async function remove(itemId){
        var id = getCookie("cart-id")
        var result = await axios.post(getEndpoint(endPoints.removecartItem), {
            id: id,
            itemId: itemId
        });
        setBagChanged(!bagChanged);

    }
  return (
    <Drawer position='right' onClose={props.onClose} opened={props.opened} title="Your Cart">
        <div className="h-full w-full flex flex-col gap-2 items-between">
            <div className="flex justify-between text-xs">
                <p>Products</p>
                <p>Total (NPR)</p>
            </div>
            <hr></hr>
            {
                items.map((value) => {
                    return <BagMenuItem key={value.item.id} name={value.item.name} price={value.item.price} image={value.item.image} count={value.count} remove={() => {remove(value.item.id)}}></BagMenuItem>;
                })
            }
            
            
            <hr></hr>
            <div className="flex justify-between items-center">
                <h1 className=''>Estimated Total</h1>
                <div className="flex gap-2 items-end">
                    <p className='text-sm font-light'>NPR</p>
                    {
                        items.forEach(element => {
                            tmp += element.item.price * element.count
                        })
                    }
                    <p className='text-2xl'> रु {tmp}</p>
                </div>
                
            </div>
            <Button color='black'>Check out</Button>
        </div>
        
    </Drawer>
  )
}
