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
                item: true
            }
        });
        

        res.status(200).json({
            success: true,
            message: "Success!",
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