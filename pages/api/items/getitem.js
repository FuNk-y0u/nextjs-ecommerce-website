import prisma from "@/lib/db";

export default async function getitem(req, res){
    if (req.method == "POST"){
        const results = await prisma.Items.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                image: true,
                description: false
            }
        });
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