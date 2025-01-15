import prisma from "../../../lib/db";

export default async function addorder(req, res) {
  if (req.method == "POST") {
    var cartId = req.body.cartId;
    if (!cartId) {
      res.status(200).json({
        success: false,
        message: "Invalid cartId",
      });
      return;
    }

    await prisma.Orders.create({
      data: {
        cartId: cartId,
        email: req.body.email,
        phone: req.body.phone,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        shippingAddress: req.body.address,
        city: req.body.city,
      },
    });
    res.status(200).json({
      success: true,
      message: "Sucessfully",
    });
    const items = await prisma.CartItem.findMany({
      where: {
        AND: [{ cartId: cartId }],
      },
      select: {
        itemId: true,
      },
    });
    let itemIdArray = [];
    items.forEach((element) => {
      itemIdArray.push(element.itemId);
    });
    await prisma.items.updateMany({
      where: {
        id: {
          in: itemIdArray,
        },
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
