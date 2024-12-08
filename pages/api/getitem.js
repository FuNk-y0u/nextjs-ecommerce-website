import prisma from "db";

export default async function getitem(req, res){
    if (req.method == "POST"){
        const results = await prisma.Items.findMany({});
        if(!results){
            res.status(200).json({
                success: true,
                message: "No products",
            });
        }
        res.status(200).json({
            success: true,
            message: "Sucessfull",
            items: results
        });

    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}