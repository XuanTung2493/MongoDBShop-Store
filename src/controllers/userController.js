const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers();
    // Render tệp views/users/index.ejs và truyền dữ liệu 'users'
    res.render('users/index', { 
      users: users,
      pageTitle: 'Trang chủ' 
    });
  } catch (error) {
    next(error);
  }
};