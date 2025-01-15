import prisma from "../../../lib/db";

export default async function getcartid(req, res) {
  if (req.method == "POST") {
    var id = req.body.id;
    var itemId = req.body.itemId;
    var itemCount = req.body.itemCount ? req.body.itemCount : 1;

    if (!id) {
      res.status(200).json({
        success: false,
        message: "Invalid cart id",
      });
      return;
    }

    if (!itemId) {
      res.status(200).json({
        success: false,
        message: "Invalid item id",
      });
      return;
    }

    const item = await prisma.CartItem.findFirst({
      where: {
        AND: [{ cartId: id }, { itemId: itemId }],
      },
    });

    if (!item) {
      await prisma.CartItem.create({
        data: {
          cartId: id,
          itemId: itemId,
          count: itemCount,
        },
      });
    } else {
      await prisma.CartItem.update({
        where: {
          id: item.id,
        },
        data: {
          count: itemCount,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Success!",
    });
    return;
  } else {
    res.status(200).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
