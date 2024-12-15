import bcrypt from 'bcrypt';

export default function bcrypt_compare(value1, value2){
    return bcrypt.compare(value1, value2);
}