import { NavLink } from '@mantine/core';


import { IconTruckDelivery } from '@tabler/icons-react';
import { IconListLetters } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import { IconLogout } from '@tabler/icons-react';

import {useState } from "react";
import SectionLabel from './Admin/SectionLabel';

export default function AdminNav(props){
    const [active, setActive] = useState(props.initPageIndex);

    const data = [
        {
            icon: <IconTruckDelivery />,
            label: "Orders",
            description: "List of all the placed orders"
        },
        {
            icon: <IconListLetters/>,
            label: "Items",
            description: "List of all the placed orders"
        }
    ];

    const items = data.map((item, index) => (
        <NavLink 
            key={index}
            active={index === active}
            label={item.label}
            leftSection={
                item.icon
            }
            color='black'
            description={item.description}
            onClick={() => {
                setActive(index);
                props.onPageChange(index);
            }}
        ></NavLink>
    ));



    return <div className="flex flex-col items-around w-64 bg-gray-100 h-[100vh] text-black shadow-sm gap-4 overflow-y-scroll sticky top-0">

        <div className="flex items-center justify-center h-32 w-full font-bold text-xl">
            Admin Dashboard
        </div>
        <SectionLabel title="Ecommerce Configurations" />
        {items}
        <SectionLabel title="Account Configurations" />
        <NavLink 
                label="Settings"
                leftSection={
                    <IconSettings/>
                }
                color='black'
                description="Dashboard configuration"
                childrenOffset={28}
            >
                <NavLink 
                    label="Logout"
                    leftSection={
                        <IconLogout/>
                    }
                    color='black'
                    description="Logout of admin account"
                    onClick={props.logout}
                />
            </NavLink>
    </div>
}