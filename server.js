const http=require('http');
const dotenv=require('dotenv');
const express = require('express')
const app = express()
dotenv.config();
const PORT=process.env.PORT;
require("./config/db")();
const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body
const personRouter=require('./routes/personRoute');
const menuItemRouter=require('./routes/menuItemRoute');

app.use('/person',personRouter);
app.use('/menu',menuItemRouter);


app.get('/', function (req, res) {
  res.send('Hello World')
})




 

 







let server = http.createServer(app);
server.listen(PORT,function(err){
    if(err)throw err;
    console.log(`server is running on port: ${PORT}`)
});