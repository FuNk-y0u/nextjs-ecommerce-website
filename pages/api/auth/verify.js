import bcrypt_compare from "../../../lib/crypt";
import prisma from "../../../lib/db";
import {gen_admin_token} from "../../../lib/token";


export default async function verify(req, res){
    if (req.method == "POST"){
        var password = req.body.password;
        if(!password){
            res.status(200).json({
                message: "Password missing",
            });
            return;
        }

        var admin = await prisma.Admin.findUnique({
            where: {
                id: 1
            }
        });

        var pass_cmp = await bcrypt_compare(password, admin.passwordHash);

        if (!pass_cmp){
            res.status(200).json({
                message: "Invalid password",
                success: false
            });
            return;
        }

        let token = gen_admin_token();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Set-Cookie", `auth=${token}`);
        res.status(200).json({
            token: token,
            message: "Login sucessfull.",
            success: true
        });
    }
    else{
        res.status(200).json({
            success: false,
            message: "Method not allowed",
        });
    }
    
    return;
}
