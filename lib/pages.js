export const endPoints = {
    authAdmin: 0,
    sesAdmin: 1,
    addItem: 2,
    delItem: 3,
    getItem: 4,
    editItem: 5
}

export const getEndpoint = (endpoint) =>{
    console.log(endPoints.authAdmin);
    switch(endpoint){
        case endPoints.authAdmin:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/auth/verify`;
            break;
        case endPoints.sesAdmin:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/auth/session`;
            break;
        case endPoints.addItem:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/additem`;
            break;
        case endPoints.delItem:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/deleteitem`;
            break;
        case endPoints.getItem:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/getitem`;
            break;
        case endPoints.editItem:
            return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/edititem`;
            break;

    }
}
