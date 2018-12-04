const express = require('express');
const app = express();
const { handleTrending } = require('./handlers');

app.get('/trending', handleTrending);

app.listen(8888, () => console.log('App started!'))
