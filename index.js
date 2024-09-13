const express = require('express');
const app = express();

const User = require('./models/user');

app.listen(3000, () => {
    console.log('Serving the app on port 3000!')
})