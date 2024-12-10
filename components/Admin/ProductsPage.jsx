import React, { useEffect, useState } from 'react'
import axios from "axios";

import { Loader, Dialog, Button, TextInput, JsonInput, Textarea, Checkbox } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getCookie } from 'cookies-next';

import { IconCirclePlus } from '@tabler/icons-react';
import AdminListTable from './AdminListTable';

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

    const add_item = async (event) => {
        event.preventDefault();

        if(isLoading){
            return;
        }

        let token = getCookie("auth");
        setIsLoading(true);
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
        setIsLoading(false);
    }

    const delete_item =  async (id) => {

        if(isLoading){
            return;
        }

        setIsLoading(true);

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
        setIsLoading(false);
    }

  return (
    <div className='flex flex-col p-4 gap-2'>
        
        <Dialog position={{bottom: 20, left: 20}} opened={isLoading}>
            <div className="flex items-center gap-2">
                <Loader size="sm" color='black'></Loader>
                Loading
            </div>
        </Dialog>
        
        <Dialog position={{ bottom: 20, right: 20 }} opened={opened} withCloseButton onClose={close}>
            <form className="flex flex-col gap-2" onSubmit={add_item}>
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
                <Button color='black' type='submit'>{isLoading?<Loader color="white" size="xs"/>: "Add item"}</Button>
            </form>
        </Dialog>
        
        {/* Header for the page */}
        <div className='flex justify-between'>
            <div className="flex text-2xl items-center gap-2">
                Listed items
            </div>
            <Button color='black' leftSection={<IconCirclePlus/>} onClick={toggle}>Add item</Button>
        </div>

        {/* Item listing stuff */}
        <AdminListTable items={items} headers={["","Id","Name","Description","Price"]} delete_item={delete_item}/>

    </div>
  )
}
