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

const check_admin = (token) => {
  var result = check_token(token);
  if(!result){
    return false;
  }
  else{
      return true
  }
}
module.exports = {gen_admin_token, check_token, check_admin};