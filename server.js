const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

//Route files
const menuitems = require('./routes/menuitems');
const orderitems =  require('./routes/orderitems');
const users =  require('./routes/users');


//Load env vars
dotenv.config({path:'./config/config.env'});

const app = express();


//Mount routes
app.use('/api/v1/menuitems', menuitems);
app.use('/api/v1/orderitems',orderitems);
app.use('/api/v1/users', users);


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log('Server running in ' , process.env.NODE_ENV,  'mode on port', PORT ))
