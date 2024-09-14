const express = require('express');
const app = express();

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

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