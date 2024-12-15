import {check_admin} from "../../../lib/token";

export default function session(req, res){
    if (req.method == "POST"){
        var token = req.body.token;
        if(!token){
            res.status(200).json({
                message: "Token missing",
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
        else{
            res.status(200).json({
                success: true,
                message: "Valid token",
            });
        }

    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
}