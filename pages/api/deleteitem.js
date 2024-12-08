import prisma from "db";
import {check_admin} from "token";
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

        
        var product = await prisma.Items.findUnique({
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

        await prisma.Items.delete({
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