import { v4 as uuidv4 } from 'uuid';

export default function getcartid(req, res){
    if (req.method == "POST"){
        res.status(200).json({
            success: true,
            message: "Success!",
            id: uuidv4()
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}