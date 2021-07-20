const express = require('express');
const indexRoute = require('./routes/index');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/', indexRoute);

const PORT = 5000;

app.listen(PORT, console.log(`server is listening at ${PORT}`));