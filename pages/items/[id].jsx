import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { endPoints, getEndpoint } from '../../lib/pages';
import { Button } from '@mantine/core';

export default function item({item}) {
    const [citem, setItem] = useState(item);

  return (
    <div className='flex md:flex-row flex-col w-full h-full items-center justify-center gap-6 p-10'>
        <img src={citem.image} className='w-96 h-96 rounded-lg'></img>
        <div className="flex flex-col gap-3 w-96">
            <h1 className='text-4xl font-bold'>{citem.name}</h1>
            <div className="flex gap-2">
                <p className='text-xl font-light'>NPR</p>
                <p className='text-xl'>रु {citem.price}</p>
            </div>
            
            <Button color='black'>Add to cart</Button>
            <p className=''>{citem.description}</p>
        </div>
    </div>
  )
}

export async function getServerSideProps({params}){
    var result = await axios.post(getEndpoint(endPoints.getitemId), {id: params.id});
    return {
        props: {
            item: result.data.items[0]
        }
    }
}