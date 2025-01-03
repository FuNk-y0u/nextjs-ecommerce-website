import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/db';

export default async function changeitemcount(req, res){
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

        if(!itemId){
            res.status(200).json({
                success: false,
                message: "Invalid item id",
            });
            return;
        }

        const item = await prisma.CartItem.findFirst({
            where: {
              AND: [
                { cartId: id },
                { itemId: itemId }
              ]
            }
        });

        if(!item){
            res.status(200).json({
                success: false,
                message: "Invalid item id or product id",
            });
            return;
        }
        
        await prisma.CartItem.update({
            where: {
                id: item.id
            },
            data: {
                count: itemCount
            }
        });

        res.status(200).json({
            success: true,
            message: "Success!",
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