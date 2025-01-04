import { Button, Loader, TextInput } from '@mantine/core'
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import { getEndpoint, endPoints } from '../../lib/pages';
import BagMenuItem from '../../components/Default/BagMenuItem';
import {useForm } from '@mantine/form';

import { useRouter } from 'next/navigation';
import CheckoutItem from '../../components/Checkout/CheckoutItem';
async function remove(itemId, onComplete){
        var id = getCookie("cart-id");
        var result = await axios.post(getEndpoint(endPoints.removecartItem), {
            id: id,
            itemId: itemId
        });
        onComplete();
    }
async function sendOrder(order, router){
  var id = getCookie("cart-id");
  console.log("=====");
  console.log(order);
  var result = await axios.post(getEndpoint(endPoints.addorder),
  {
    cartId: id,
    email: order.email,
    phone: order.phone,
    firstname: order.firstname,
    lastname: order.lastname,
    address: order.address,
    city: order.city
  });
  deleteCookie("cart-id");
  router.push("/ordersucess");
}

export default function index() {
  const router = useRouter();
  const form = useForm({
    mode: 'uncontrolled',
    
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  })
  const [bagChanged, setBagChanged] = useState(false);
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0.0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCart() {
        var id = getCookie("cart-id");
        var result = await axios.post(getEndpoint(endPoints.getcartItems), {
            id: id
        });
        console.log(result);
        setItems(result.data.items);
        setTotalCost(result.data.total);
        setLoading(false);
    }
    getCart();
  },[bagChanged]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex w-full border flex-col gap-4 p-4 items-center lg:items-end">
        <div className="flex flex-col w-96">
          <h1 className='text-2xl font-medium'>Delivery</h1>
        </div>
        
        <form className='flex flex-col gap-2 w-96' onSubmit={form.onSubmit((values) => {
          sendOrder(values, router);
        })}>
          <TextInput label="Your email" key={form.key("email")}
            {...form.getInputProps("email")}
          ></TextInput>
          <TextInput label="Your phone number" key={form.key("phone")}
          {...form.getInputProps("phone")}></TextInput>
          <TextInput label="Address" key={form.key("address")}
          {...form.getInputProps("address")}
          ></TextInput>
          <div className="flex w-full gap-2">
            <TextInput label="First Name" className='w-full' key={form.key("firstname")} {...form.getInputProps("firstname")}></TextInput>
            <TextInput label="Last Name" className='w-full' key={form.key("lastname")} {...form.getInputProps("lastname")}></TextInput>
          </div>
          <TextInput label="City" className='w-full' key={form.key("city")} {...form.getInputProps("city")}></TextInput>
          <div className="flex flex-col">
            <Button color='black' type='submit' className='w-full'>Complete Order</Button>
          </div>
          
        </form>

      </div>
      <div className="flex flex-col w-full h-[100vh] bg-gray-100 gap-5 p-8 lg:items-start items-center">
        <h1 className='text-2xl'>Order Summary</h1>
        {
          loading?
          <div className="flex items-center justify-center w-96">
            <Loader color='black' ></Loader>
          </div>
          
          :
          items.map((value) => {
            return <CheckoutItem name={value.item.name} image={value.item.image} price={value.total} count={value.count}></CheckoutItem>
          })
        }
        
        <div className="flex justify-between w-96">
          <p className='font-medium text-xl'>Total</p>
          <div className="flex gap-2">
            <p className='font-light'>NPR</p>
            <p className='font-medium'>रु {totalCost}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
