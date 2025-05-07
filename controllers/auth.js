const User = require("../models/User");

//Rergister User

exports.register = async (req, res, next) => {
  try {
    const { name, telnumber,email, password, role } = req.body;
   

    //Create user and keep in database
    const user = await User.create({
        name,telnumber,email,password,role
    });
    console.log("register success");
    res.status(200).json({ success: true });
  } 
  catch (err) {
    
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};
