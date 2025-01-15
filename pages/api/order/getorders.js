import prisma from "../../../lib/db";

export default async function getorders(req, res) {
  if (req.method == "POST") {
    const results = await prisma.Orders.findMany({
      orderBy: {
        date: "desc",
      },
    });

    res.status(200).json({
      success: true,
      message: "Sucessfull",
      items: results,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Method no allowed",
    });
  }
}
