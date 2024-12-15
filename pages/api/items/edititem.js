import prisma from "lib/db";
import {check_admin} from "../../../lib/token";
export default async function deleteitem(req, res) {
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

        var newProduct = {
            name: body.name?body.name:"",
            description: body.description?body.description:"",
            price: body.price?body.price:""
        }

        await prisma.Items.update({
            where: {id: id},
            data: newProduct
        });

        res.status(200).json({
            success: true,
            message: "Sucessfully updated product",
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}