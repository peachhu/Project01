const User = require('../models/User');
const jwt = require('jsonwebtoken');


//Protect the route + check token
exports.protect=async (req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    //Check if token exists
    if(!token){
        return res.status(401).json({success: false,msg: "Not authorize to access this route"});

    }

    try{
        //Verfiy token

        const decoded_token = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded_token);

        req.user = await User.findById(decoded_token.id);

        next(); // move on to next middle ware or route

    }catch(err){
        console.log(err.stack)
        return res.status(401).json({success: false,msg: "Not authorize to access this route"});
    }

}