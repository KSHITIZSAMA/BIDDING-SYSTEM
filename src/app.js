const express=require('express');
const cors=require('cors');
const rfqRoutes = require("./routes/rfqRoutes");
const bidRoutes = require('./routes/bidRoutes');
const authRoutes = require('./routes/authRoutes');

require('./config/db');

const app=express();


app.use(cors());
app.use(express.json());
app.use("/rfq", rfqRoutes);
app.use('/bid', bidRoutes);
app.use('/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send("server is running");
});


module.exports = app;