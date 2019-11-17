const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');

require('dotenv').config();

require('./config/dbConnection')();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./uploads'));
app.use(routes);

app.listen(process.env.PORT);
