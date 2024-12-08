import { Button } from "@mantine/core";


export function AdminHeader(props) {
    return <>
        <div className="flex bg-gray-50 h-20 items-center justify-around sticky top-0 shadow-md ">
            <h1 className="text-2xl font-bold">Admin dashboard</h1>
            
            <Button color="black">
                Logout
            </Button>
        </div>
    </>
}