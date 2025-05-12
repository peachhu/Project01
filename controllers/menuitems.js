const Menuitem = require("../models/Menuitem");
const asyncHandler = require('express-async-handler');


//Get all Menuitems
// route => GET /api/v1/menuitems
//access public
exports.getMenuitems = asyncHandler(async(req, res, next) => {
  
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Fields to exclude
    const removeFields=['select','sort']

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);
    console.log(reqQuery);

    //Creqte query string
    let queryStr = JSON.stringify(reqQuery);

    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g , match=>`$${match}`);

    let queryObj = JSON.parse(queryStr);

    query = Menuitem.find(queryObj)
    
  //Select Fields
  if(req.query.select){
    const selected_fields = req.query.select.split(',').join(' ');
    query=query.select(selected_fields);
  }

  //Sort
   if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query=query.sort(sortBy);
  }else{
     query=query.sort('-createdAt');
  }

    const menues = await Menuitem.find(query);

    res.status(200).json({ success: true, count: menues.length, data: menues });

});

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
    const menu = await Menuitem.findByIdAndUpdate(req.params.id, req.body,{
      new : true,
      runValidators : true
    });
    
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
    
    
    res.status(200).json({ success: true, data: {} });


  } catch (err) {
    res.status(400).json({success:false});
  }
};
