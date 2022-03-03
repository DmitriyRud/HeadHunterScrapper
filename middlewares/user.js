const checkUser = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.redirect('/users/login'); // если в сессии нет userName тогда редирект
  }
};

const deepCheckUser = (req, res, next) => {
  console.log('deepCheckUser');
  console.log(req.params.id, req.session.userId);
  if (Number(req.session.userId) === Number(req.params.id)) { 
    next();
  } else {
    res.redirect(`/users/${req.session.userId}`); 
  }
};

module.exports = {
  checkUser, deepCheckUser,
};
