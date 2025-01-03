import prisma from "../../../lib/db";

export default async function addorder(req, res){
    if (req.method == "POST"){
        var cartId = req.body.cartId;
        if(!cartId){
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
                city: req.body.city
            }
        });
        res.status(200).json({
            success: true,
            message: "Sucessfully",
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}