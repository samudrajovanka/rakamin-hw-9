const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('module-alias/register');
require('dotenv').config();


const { notFound, error } = require('@/middlewares/error');
const routers = require('./routes');

const app = express();

/**
 * express middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * logging
 */
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'access.log'),
  { flags: 'a' }
)
app.use(morgan('common', { stream: accessLogStream }));

/**
 * routing
 */
app.use(routers);
app.use(notFound);
app.use(error);

/**
 * server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});