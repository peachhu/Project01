const express = require('express');
const {getMenuitem,getMenuitems,updateMenuitem,createMenuitem,deleteMenuitem} = require('../controllers/menuitems')
const router = express.Router();
const {protect} = require('../middleware/auth');


router.route('/').get(getMenuitems).post(protect,createMenuitem);
router.route('/:id').get(getMenuitem).put(protect,updateMenuitem).delete(protect,deleteMenuitem)

module.exports = router;