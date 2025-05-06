const express = require('express');
const router = express.Router();

const app = express();

router.get('/',(req,res)=>{
res.status(200).json({success:true, msg:'Show all menus'});
});

router.get('/:id',(req,res)=>{
    res.status(200).json({success:true, msg:`Show menu ${req.params.id}`});
    });

router.post('/',(req,res)=>{
res.status(200).json({success:true, msg:'Create new menus'});
});

router.put('/:id',(req,res)=>{
    res.status(200).json({success:true, msg:`Update menu ${req.params.id}`});
    });

router.delete('/:id',(req,res)=>{
        res.status(200).json({success:true, msg:`Delete menu ${req.params.id}`});
        });

module.exports = router;