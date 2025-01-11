import getorders from "../pages/api/order/getorders";

export const endPoints = {
  authAdmin: 0,
  sesAdmin: 1,
  addItem: 2,
  delItem: 3,
  getItem: 4,
  editItem: 5,
  uploadImage: 6,
  getitemId: 7,
  getitemIds: 8,
  getcartId: 9,
  changeitemCount: 10,
  addcartItem: 11,
  getcartItems: 12,
  removecartItem: 13,
  addorder: 14,
  getorders: 15,
  delorder: 16,
  getcartsItems: 17,
};

export const getEndpoint = (endpoint) => {
  switch (endpoint) {
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
    case endPoints.uploadImage:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/uploadimage`;
      break;
    case endPoints.getitemId:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/getitemid`;
      break;
    case endPoints.getitemIds:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/items/getitemids`;
      break;
    case endPoints.getcartId:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/getcartid`;
      break;
    case endPoints.changeitemCount:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/changeitemcount`;
      break;
    case endPoints.addcartItem:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/addcartitem`;
      break;
    case endPoints.getcartItems:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/getcartitems`;
      break;
    case endPoints.removecartItem:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/removecartitem`;
      break;
    case endPoints.addorder:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/order/addorder`;
      break;
    case endPoints.getorders:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/order/getorders`;
    case endPoints.delorder:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/order/deleteorder`;
    case endPoints.getcartsItems:
      return `${process.env.NEXT_PUBLIC_SV_IP}/api/cart/getcartsitems`;
  }
};
