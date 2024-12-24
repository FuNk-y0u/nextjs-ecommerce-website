import prisma from "../../../lib/db";

export default async function removecartitem(req, res){
    if(req.method == "POST"){
        var id = req.body.id;
        var itemId = req.body.itemId;


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

        var item = await prisma.CartItem.findFirst({
            where: {
                AND: [
                    {cartId: id},
                    {itemId: itemId}
                ]
            }
        });

        if(!item){
            res.status(200).json({
                success: false,
                message: "Item not found",
            });
            return;
        }
        
        await prisma.CartItem.delete({
            where: {
                id: item.id
            }
        });

        res.status(200).json({
            success: true,
            message: "Sucessfully deleted product",
        });

    }
}