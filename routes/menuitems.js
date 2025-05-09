const express = require('express');
const {getMenuitem,getMenuitems,updateMenuitem,createMenuitem,deleteMenuitem} = require('../controllers/menuitems')
const router = express.Router();
const {protect,authorize} = require('../middleware/auth');


router.route('/').get(getMenuitems).post(protect,authorize('admin'),createMenuitem);
router.route('/:id').get(getMenuitem).put(protect,authorize('admin'),updateMenuitem).delete(protect,authorize('admin'),deleteMenuitem)

module.exports = router;