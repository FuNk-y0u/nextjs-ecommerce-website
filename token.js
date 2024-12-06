import jwt from "jsonwebtoken";

const gen_admin_token = () => {
    let data = {
      time: Date(),
      type: "ADMIN",
    };
    let token = jwt.sign(data, process.env.NEXT_PUBLIC_JWT_TOKEN_SECRET);
    return token;
}

const check_token = (token) => {
  try{
    var verified = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN_SECRET);
    return verified;
  }
  catch(err){
    return false;
  }
}

module.exports = {gen_admin_token, check_token};