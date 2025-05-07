const User = require("../models/User");

//Register User
// POST /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, telnumber,email, password, role } = req.body;
   

    //Create user and keep in database
    const user = await User.create({
        name,telnumber,email,password,role
    });
    
    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true,token });
  } 
  catch (err) {
    
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};



//Login User
// POST /api/v1/auth/login
exports.login = async (req, res, next) => {
 
    const { email, password } = req.body;
   

  //Validate email & password
  if(!email||!password){
    return res.status(400).json({success:false,msg:"Please provide email and password."})
  }

//Check for user (exist in DB or not)
const user = await User.findOne({email}).select('+password');
if(!user){
  return res.status(400).json({success:false,msg:"Invalid credentials"});
}

//Check if password is matched
const isMatch = user.matchPassword(password);

if(!isMatch){
  return res.status(401).json({success:false,msg:"Invalid credentials"});
}

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true,token });
  } ;
 

