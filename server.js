const express = require('express');
const app = express();
// const router = express.Router();
const port = 9000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const databaseLink = require('./config/database');
const path = require('path');
const cors = require('cors');
const passport = require("passport");
const auth = require('./routes/authentication')
const profile = require('./routes/profile')
//dababase connection

mongoose
  .connect(databaseLink.url)
  .then(() => {
    console.log(`Database connected at ${databaseLink.url}`);
  })
  .catch(err => {
    console.log(err);
  });

//cors configuration

app.use(cors({origin:'http://localhost:4200'}))

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'));

//passport middleware
//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

/* routes */

app.use("/auth", auth);
app.use("/api/profile", profile);


app.use(express.static(__dirname + '/Client/dist'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/Client/dist/index.html'))
})

// ng g component hi --module app

app.listen(port,()=>{
    console.log('server is running at:',port);
})