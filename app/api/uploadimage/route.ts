import { NextRequest, NextResponse } from "next/server";
import {writeFile} from "fs/promises";
import { join } from "path";
import {v4 as uuidv4} from 'uuid';

export async function POST(req: NextRequest, res: NextResponse){
    try{
        const file = (await req.formData()).get("file") as File;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const fileExtension = "." + file.type.split("/")[1];

        let uuid = uuidv4();
        const path = "public/items/" + uuid + fileExtension;
        await writeFile(path, buffer);

        const imageUrl = `${process.env.NEXT_PUBLIC_SV_IP}/items/${uuid + fileExtension}`;
        console.log(imageUrl);
        return Response.json({ "sucess": true, "path": imageUrl});
    }
    catch(e){
        console.log(e);
        return Response.json({ "sucess": false});
    }
    
}
