const express = require('express');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/user');

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/loginDemo')
.then(()=>console.log("Mongo connection is open!"))
.catch((err)=>{
    console.log("Something went wrong, unable to connect to Mongo");
    console.log(err);
})

app.set('view engine', 'ejs');
app.set('views', 'views');

// A middleware for parsing req.body
app.use(express.urlencoded({extended: true}));

// This route renders a registration form
app.get('/register', (req, res) => {
    res.render('register');
})

// Set up a first basic route
app.get('/secret', (req, res) => {
    res.send('This is a secret. You cannot see a secret, unless you are logged in!')
})

app.listen(3000, () => {
    console.log('Serving the app on port 3000!')
})