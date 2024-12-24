import prisma from "@/lib/db";
import {check_admin} from "@/lib/token";
export default async function getitemids(req, res){
    if (req.method == "POST"){
        var ids = req.body.ids;
        
        if(!ids){
            res.status(200).json({
                success: false,
                message: "Invalid request",
            });
            return;
        }

        const result = await prisma.Items.findMany({
            where: {
                id: {in: ids}
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