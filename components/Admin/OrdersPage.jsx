import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Button, Loader} from '@mantine/core';
import { endPoints, getEndpoint } from '../../lib/pages';
import BagMenuItem from '../Default/BagMenuItem';

function genCartItems(Cartitems){
  var data = [];
  Cartitems.forEach((item) => {
    console.log(item.item.name, item.count)
    data.push(<BagMenuItem count={item.count} image={item.item.image} name={item.item.name} price={item.item.price}></BagMenuItem>)
  });
  console.log(data);
  return data;
}

export default function OrdersPage() {
  const [items, setItems] = useState([]);
  const [carItems, setCartItems] = useState({});
  useEffect(
    () => {
      async function getOrders(){
        let result = await axios.post(getEndpoint(endPoints.getorders));
        setItems(result.data.items);

        let cartIds = [];
        result.data.items.forEach((data) => {
          if(!cartIds.includes(data.cartId)){
            cartIds.push(data.cartId);
          }
        })
        console.log("======TEST 2=====");
        console.log(cartIds);
        let result2 = await axios.post(getEndpoint(endPoints.getcartsItems),{
          ids: cartIds
        });
        console.log("======TEST=====");
        console.log(result2.data.items);
        setCartItems(result2.data.items);
      }
      getOrders();
    }, []
  );
  return (
    <div className="">
      <h1>Hello world</h1>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              Id
            </Table.Th>
            <Table.Th>
              Shipping Address
            </Table.Th>
            <Table.Th>
              Email
            </Table.Th>
            <Table.Th>
              Phone
            </Table.Th>
            <Table.Th>
              Firstname
            </Table.Th>
            <Table.Th>
              Lastname
            </Table.Th>
            <Table.Th>
              City
            </Table.Th>
            <Table.Th>
              Items
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {
            items.map((item)=>{
              return <Table.Tr>
                <Table.Td>
                  {item.id}
                </Table.Td>
                <Table.Td>
                  {item.shippingAddress}
                </Table.Td>
                <Table.Td>
                  {item.email}
                </Table.Td>
                <Table.Td>
                  {item.phone}
                </Table.Td>
                <Table.Td>
                  {item.firstName}
                </Table.Td>
                <Table.Td>
                  {item.lastName}
                </Table.Td>
                <Table.Td>
                  {item.city}
                </Table.Td>
                <Table.Td>
                  {
                    carItems[item.cartId]?genCartItems(carItems[item.cartId]):<Loader size="sm" color='black'></Loader>
                  }
                </Table.Td>
              </Table.Tr>
            })
          }
        </Table.Tbody>
      </Table>
      
    </div>

  )
}
