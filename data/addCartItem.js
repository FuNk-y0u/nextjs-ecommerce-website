import axios from "axios";
import { getEndpoint, endPoints } from "../lib/pages";

export default async function addCartItem(cartId, itemId, itemCount, onfail) {
  var result = await axios.post(getEndpoint(endPoints.addcartItem), {
    id: cartId,
    itemId: itemId,
    itemCount: itemCount,
  });

  if (result.data.success) {
    return true;
  } else {
    onfail(result);
    return false;
  }
}
