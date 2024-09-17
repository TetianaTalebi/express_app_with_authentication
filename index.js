const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

// Create an object with the secret string for session
// We keep the secret string in index.js only for demo purposes!!!
const sessionOptions = {
    secret: 'notagoodsecret', 
    resave: false,
    saveUninitialized: true};

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

app.use(session(sessionOptions));

// This is a Home Page route
app.get('/', (req, res)=>{
    res.send('This is the Home Page!!!');
})

// This route renders a registration form
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res)=>{
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User ({
        username,
        hashedPw: hash
    });
    await user.save();
    req.session.user_id=user._id;
    res.redirect('/');
})

// This route renders a login form

app.get('/login', (req, res)=> {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    // This expression returns 'true' or 'false'
    // So, validPassword will be equal to 'true' or 'false'
    const validPassword = await bcrypt.compare(password, user.hashedPw);
    if (validPassword){
        req.session.user_id=user._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

// Set up a first basic route
app.get('/secret', (req, res) => {
    if (!req.session.user_id){
        res.redirect('/login');
    }
    res.send('This is a secret. You cannot see a secret, unless you are logged in!')
})

app.listen(3000, () => {
    console.log('Serving the app on port 3000!')
})