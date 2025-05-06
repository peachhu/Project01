
//Get all Menuitems 
// route => GET /api/v1/menuitems
//access public
exports.getMenuitems=(req,res,next)=>{
  res.status(200).json({success:true,msg: "Show all Menuitems"});
};

//Get single menuitem
// route => GET /api/v1/menuitems/:id
//access public
exports.getMenuitem=(req,res,next)=>{
    res.status(200).json({success:true,msg: `Show Menuitems ${req.params.id}`});
  };

//Create Menuitem 
// route => POST /api/v1/menuitems
//access private
exports.createMenuitem=(req,res,next)=>{
    res.status(200).json({success:true,msg: "Create new Menuitems"});
  };


//Update menuitem
// route => PUT /api/v1/menuitems/:id
//access private
exports.updateMenuitem=(req,res,next)=>{
    res.status(200).json({success:true,msg: `Update Menuitems ${req.params.id}`});
  };



  //Delete menuitem
// route => DELETE /api/v1/menuitems/:id
//access private
exports.deleteMenuitem=(req,res,next)=>{
    res.status(200).json({success:true,msg: `Delete Menuitems ${req.params.id}`});
  };