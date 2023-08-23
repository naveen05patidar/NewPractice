const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;
const config = 'mongodb+srv://naveen05patidar:naveen123@cluster0.wh3fpsk.mongodb.net/?retryWrites=true&w=majority';
// const config = 'mongodb://127.0.0.1:27017/database';
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./route/user.route.js');
// const filesRouter = require('./route/files.route.js');


mongoose.Promise = global.Promise;
mongoose.connect(config,({useNewUrlParser:true})).then(()=>{
    console.log(`database is connected on ${config}`);
}).catch((err)=>{
    console.log(`database is not connected due to err: ${err}`);
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/user',Router);
// app.use('/filesRouter',filesRouter);

app.listen(PORT,(()=>{
    console.log(`Server is connected on port no. ${PORT}`);
}));