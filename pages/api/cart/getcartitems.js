import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/db';

export default async function getcartitems(req, res){
    if (req.method == "POST"){
        var id = req.body.id;
        var itemId = req.body.itemId;
        var itemCount = req.body.itemCount;

        if(!id){
            res.status(200).json({
                success: false,
                message: "Invalid cart id",
            });
            return;
        }

        const items = await prisma.CartItem.findMany({
            where: {
              AND: [
                { cartId: id }
              ]
            },
            include: {
                item: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        description: false
                    }
                }
            }
        });

        var total = 0.0;

        items.forEach(element => {
            element.total = element.count * Number(element.item.price)
            total += element.total
        });

        res.status(200).json({
            success: true,
            message: "Success!",
            total: total,
            items: items
        });
        return;
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}