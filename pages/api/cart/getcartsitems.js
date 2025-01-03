import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/db';

export default async function getcartsitems(req, res){
    if (req.method == "POST"){
        var ids = req.body.ids;


        if(!ids){
            res.status(200).json({
                success: false,
                message: "Invalid cart id",
            });
            return;
        }

        const items = await prisma.CartItem.findMany({
            where: {
                AND: [
                    {cartId: {
                        in: ids
                    }}
                ]
            },
            include: {
                item: true
            }
        });
        let sortedItems = {};
        items.forEach(element => {
            sortedItems[element.cartId] = []
        });
        items.forEach(element => {
            sortedItems[element.cartId].push(element);
        });

        res.status(200).json({
            success: true,
            message: "Success!",
            items: sortedItems
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