import prisma from "@/lib/db";
import {check_admin} from "@/lib/token";
export default async function getitemid(req, res){
    if (req.method == "POST"){
        var id = req.body.id;

        if(!id){
            res.status(200).json({
                success: false,
                message: "Invalid id",
            });
            return;
        }

        const result = await prisma.Items.findMany({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success:true,
            message: "Successfull",
            items: result
        });


    }
    else{
        res.status(200).json({
            success:false,
            message: "Method not allowed"
        });
    }
}