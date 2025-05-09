const User = require("../models/User");

//Get token from models and create cookie and send response back
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  //Set option for cookie
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
    httpOnly : true
  };

  if(process.env.NODE_ENV==='production'){
    options.secure=true; //for The cookie to only be sent over HTTPS connections 
  }

  res.status(statusCode).cookie('token',token,options).json({success : true, token})
};

//Register User
// POST /api/v1/auth/register
//@access public
exports.register = async (req, res, next) => {
  try {
    const { name, telnumber, email, password, role } = req.body;

    //Create user and keep in database
    const user = await User.create({
      name,
      telnumber,
      email,
      password,
      role,
    });

    //Create token
    // const token = user.getSignedJwtToken();

    // res.status(200).json({ success: true,token });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

//Login User
// POST /api/v1/auth/login
//@access public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email & password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide email and password." });
  }

  //Check for user (exist in DB or not)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }

  //Check if password is matched
  const isMatch = user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }

  //Create token
  // const token = user.getSignedJwtToken();

  // res.status(200).json({ success: true,token });
  sendTokenResponse(user, 200, res);
};


//Get Me for user
// GET /api/v1/auth/getme
//@access private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if(!user){
    return res.status(400).json({ success: false});
  }

  res.status(200).json({success: true,data:user});
}
