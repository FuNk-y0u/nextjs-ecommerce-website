import React, { useEffect, useState } from 'react'
import axios from "axios";

import { IconImageInPicture, IconTrash } from '@tabler/icons-react';
import { Loader, Dialog, Button, TextInput, JsonInput, Textarea  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getCookie } from 'cookies-next';

export default function ProductsPage() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [opened, {toggle, close}] = useDisclosure(false);

    const [productAdded, setProductAdded] = useState(false);

    var product = {
        name: "",
        description: "",
        price: ""
    }

    useEffect(() => {
        async function getItems() {
            setIsLoading(true);
            var result = await axios.post(`${process.env.NEXT_PUBLIC_SV_IP}/api/getitem`, {});
            if(!result.data.success){
                
                console.log(result);
                
            }
            else{
                setItems(result.data.items);
                console.log(items);
            }
            setIsLoading(false);
        }
        getItems();
    },[productAdded]);

    const add_item = async () => {
        let token = getCookie("auth");
        
        var result = await axios.post(`${process.env.NEXT_PUBLIC_SV_IP}/api/additem`,{
            token: token,
            name: product.name,
            description: product.description,
            price: product.price
        });
        if(!result.data.success){
            console.log(result);
        }
        else{
            close();
            setProductAdded(!productAdded);
            
        }
    }

    const delete_item =  async (id) => {
        let token = getCookie("auth");
        var result = await axios.post(`${process.env.NEXT_PUBLIC_SV_IP}/api/deleteitem`,{
            token: token,
            id: id
        });
        if(!result.data.success){
            console.log(result);
        }
        else{
            close();
            setProductAdded(!productAdded);
        }
    }

  return (
    <div className='flex flex-col p-4 gap-2'>
        <Dialog position={{ bottom: 20, right: 20 }} opened={opened} withCloseButton onClose={close}>
            <div className="flex flex-col gap-2">
                <h1>Add new item</h1>
                <TextInput className='' label="Item name" onChange={(event) => {
                    product.name = event.currentTarget.value;
                }}></TextInput>
                <Textarea label="Item description" onChange={(event) => {
                    product.description = event.currentTarget.value;
                }}></Textarea>
                <TextInput className='' label="Item Price" placeholder='eg: NPR 1200' onChange={(event) => {
                    product.price = event.currentTarget.value;
                }}></TextInput>
                <Button className='' color='black' onClick={add_item}>Add item</Button>
            </div>
        </Dialog>
        <div className='flex justify-between'>
            <div className="flex text-2xl font-bold items-center gap-2 sticky top-0">
                Items Page
                {
                    isLoading?<Loader color='black' size="sm"></Loader>:""
                }
            </div>
            <Button color='black' onClick={toggle}>Add item</Button>
        </div>
    {
        items.map((item, index) => {
            return <div className="flex items-center justify-around bg-gray-100 rounded-lg p-4 gap-4 border-2 border-gray-300" key={index}>
                    <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                        <IconImageInPicture size={64}/>
                    </div>
                    <div className="flex justify-between w-full items-center">
                        <div className="flex flex-col">
                            <h1 className='font-bold text-2xl'>{item.name}</h1>
                            <p className='text-gray-600 text-nowrap text-ellipsis overflow-hidden '>{item.description.slice(0,64)}...</p>
                            <p className='font-semibold'>NRS {item.price}</p>
                        </div>
                        <Button variant='outline' color='red' onClick={()=>{
                            delete_item(item.id);
                        }}><IconTrash/></Button>
                    </div>
                </div>
        })
    }
    </div>
  )
}
