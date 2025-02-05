const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../secret')

function usermiddleware(req,res,next){
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwttoken = words[1];
  const decodedvalue = jwt.verify(jwttoken,JWT_SECRET);
  if(decodedvalue.username){
    req.username = decodedvalue.username
    next()
  }else{
    res.status(400).json({
      msg:"User not authorized"
    })
  }
}
module.exports = usermiddleware;