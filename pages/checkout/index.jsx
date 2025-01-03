import { Button, TextInput } from '@mantine/core'
import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'
import { getEndpoint, endPoints } from '../../lib/pages';
import BagMenuItem from '../../components/Default/BagMenuItem';
import {useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
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
  useEffect(() => {
    async function getCart() {
        var id = getCookie("cart-id");
        var result = await axios.post(getEndpoint(endPoints.getcartItems), {
            id: id
        });
        console.log(result);
        setItems(result.data.items);
    }
    getCart();
  },[bagChanged]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="flex w-full border flex-col gap-4 p-20">
        <form onSubmit={form.onSubmit((values) => {
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
          <Button color='black' type='submit'>Complete Order</Button>
        </form>

      </div>
      <div className="flex flex-col w-full h-[100vh] bg-gray-100 items-center lg:justify-center gap-5 p-8 lg:p-0">
        <h1>Order Summary</h1>
        {
          items.map((value) => {
              return <BagMenuItem key={value.item.id} name={value.item.name} price={value.item.price} image={value.item.image} count={value.count} remove={() => {remove(value.item.id, () => {setBagChanged(!bagChanged)})}}></BagMenuItem>;
          })
        }
      </div>
    </div>
  )
}
