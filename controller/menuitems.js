const Menuitem = require("../models/Menuitem");

//Get all Menuitems
// route => GET /api/v1/menuitems
//access public
exports.getMenuitems = async (req, res, next) => {
  try {
    const menues = await Menuitem.find();
    res.status(200).json({ success: true, count: menues.length, data: menues });
  } catch (err) {
    res.status(400).json({success:false});
  }
};

//Get single menuitem
// route => GET /api/v1/menuitems/:id
//access public
exports.getMenuitem = async (req, res, next) => {
  try {
    const menu = await Menuitem.findById(req.params.id);
    
    if(!menu){
     return res.status(400).json({success:false});
    }
    
    
    res.status(200).json({ success: true, data: menu });


  } catch (err) {
    res.status(400).json({success:false});
  }
};

//Create Menuitem
// route => POST /api/v1/menuitems
//access private
exports.createMenuitem = async (req, res, next) => {
  const menu = await Menuitem.create(req.body);
  console.log(req.body);
  res.status(200).json({ success: true, data: menu });
};

//Update menuitem
// route => PUT /api/v1/menuitems/:id
//access private
exports.updateMenuitem =async (req, res, next) => {
  try {
    const menu = await Menuitem.findByIdAndUpdate(req.params.id, req.body);
    
    if(!menu){
     return res.status(400).json({success:false});
    }
    
    
    res.status(200).json({ success: true, data: menu });


  } catch (err) {
    res.status(400).json({success:false});
  }
};

//Delete menuitem
// route => DELETE /api/v1/menuitems/:id
//access private
exports.deleteMenuitem = async (req, res, next) => {
  try {
    const menu = await Menuitem.findByIdAndDelete(req.params.id, req.body);
    
    if(!menu){
     return res.status(400).json({success:false});
    }
    
    
    res.status(200).json({ success: true, data: menu });


  } catch (err) {
    res.status(400).json({success:false});
  }
};
