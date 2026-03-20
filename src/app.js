const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');

const app = express();

const path = require('path');
// ... các import khác

// Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình thư mục chứa tệp tĩnh (CSS, JS, Images)
app.use(express.static(path.join(__dirname, '../public')));

// Middleware xử lý dữ liệu từ Form (URL Encoded)
app.use(express.urlencoded({ extended: true }));

// ... các cấu hình route và error handler
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes API
app.use('/api/v1/users', userRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;