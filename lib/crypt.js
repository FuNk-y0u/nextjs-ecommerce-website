import bcrypt from 'bcrypt';

export default function bcrypt_compare(value1, value2){
    console.log(bcrypt.hash(value1,process.env.NEXT_PUBLIC_JWT_TOKEN_SECRET));
    return bcrypt.compare(value1, value2);
}
