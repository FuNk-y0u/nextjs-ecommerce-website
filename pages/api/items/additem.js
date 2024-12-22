import prisma from "../../../lib/db";
import {check_admin} from "../../../lib/token";

export default async function additem(req, res) {
    if (req.method == "POST"){
        var token = req.body.token;
        
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

        var body = req.body;

        var product = {
            name: body.name?body.name:"",
            description: body.description?body.description:"",
            price: body.price?body.price:"",
            image: body.image?body.image:""
        }

        await prisma.Items.create({
            data: product
        });
        
        res.status(200).json({
            success: true,
            message: "Sucessfully added product",
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}