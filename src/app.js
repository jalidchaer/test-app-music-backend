const express = require('express');
const routes = require('./router');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({extended:true}));
app.use(routes);

module.exports = app;