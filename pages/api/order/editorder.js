import prisma from "../../../lib/db";
import {check_admin} from "../../../lib/token";

export default async function editorder(req, res){
    if (req.method == "POST"){
        var token = req.body.token;
        var id = req.body.id;

        if(!token){
            res.status(200).json({
                success: false,
                message: "Invalid token",
            });
            return;
        }

        if(!check_admin(token)){
            res.status(200).json({
                success: false,
                message: "Invalid token",
            });
            return;
        }

        if(!id){
            res.status(200).json({
                success: false,
                message: "Invalid id",
            });
            return;
        }

        var body = req.body;

        var newOrder = {
            email: body.email?body.email:"",
            phone: body.phone?body.phone:"",
            firstName: body.firstname?body.firstname:"",
            lastName: body.lastname?body.lastname:"",
            shippingAddress: body.address?body.address:"",
            city: body.city?body.city:""
        }

        await prisma.Orders.update({
            where: {id: id},
            data: newOrder
        });
        res.status(200).json({
            success: true,
            message: "Sucess!",
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}