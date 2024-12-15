
import React from 'react'
import { Table, Button} from '@mantine/core';
import { IconEdit, IconTrashFilled } from '@tabler/icons-react';

export default function AdminListTable(props) {
  return (
    <Table  withTableBorder withColumnBorders>
        {/* Table head */}
        <Table.Thead>
            <Table.Tr>
                {
                    props.headers.map((items, index) => {
                        return <Table.Th>
                            {items}
                        </Table.Th>
                    })
                }
            </Table.Tr>
        </Table.Thead>

        {/* Table body */}
        <Table.Tbody>
            {
                props.items.map((item, index) => {
                    return <Table.Tr id={index}>
                        <Table.Td>
                        <Button color='red' variant="subtle" size='xs' onClick={() => {
                            props.delete_item(item.id);
                        }}><IconTrashFilled/></Button>
                        <Button color='black' variant="subtle" size='xs' onClick={() => {
                            props.edit_item(item.id, item.name, item.description, item.price);
                        }}><IconEdit/></Button>
                        </Table.Td>
                        <Table.Td>
                            {item.id}
                        </Table.Td>
                        <Table.Td>
                            {item.name}
                        </Table.Td>
                        <Table.Td>
                            {item.description}
                        </Table.Td>
                        <Table.Td>
                            {item.price}
                        </Table.Td>
                    </Table.Tr>
                })
            }
        </Table.Tbody>
    </Table>
  )
}
