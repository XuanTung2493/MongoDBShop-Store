const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const productRouter = require('./src/routers/productRouter');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', productRouter);

module.exports = app;