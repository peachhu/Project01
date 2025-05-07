const mongoose = require('mongoose');

const MenuitemSchema = new mongoose.Schema({
 menuname : {
    type : String,
    required: [true, 'Please add a menu name'],
    unique: true,
    trim: true,
    maxlength : [50, "Menu name cannot be more than 50 characters"]
 },

  description : {
    type : String,
    required: [true, 'Please add a menu description'],
    trim: true,
 },

 price : {
    type : Number,
    required: [true, 'Please add a menu price'],
    trim: true,
    min : [0,"Menu price should be a positive number."]
 },

 recommended : {
    type : Boolean,
    default : false
 },

/*for the future develop
  picture:{
    type:String
  }*/

});


module.exports=mongoose.model('Menuitem',MenuitemSchema)