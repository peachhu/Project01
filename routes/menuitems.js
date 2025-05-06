const express = require('express');
const {getMenuitem,getMenuitems,updateMenuitem,createMenuitem,deleteMenuitem} = require('../controller/menuitems')
const router = express.Router();


router.route('/').get(getMenuitems).post(createMenuitem);
router.route('/:id').get(getMenuitem).put(updateMenuitem).delete(deleteMenuitem)

module.exports = router;