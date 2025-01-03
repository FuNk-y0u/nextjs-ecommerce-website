import prisma from "@/lib/db";
import {check_admin} from "@/lib/token";


export default async function deleteorder(req, res) {
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

        
        var product = await prisma.Orders.findUnique({
            where:{
                id: id
            }
        });

        if(!product){
            res.status(200).json({
                success: false,
                message: "Invalid product id",
            });
        }

        await prisma.Orders.delete({
            where: {
                id: id
            }
        });
        
        res.status(200).json({
            success: true,
            message: "Sucessfully deleted product",
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}