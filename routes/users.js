var express = require('express');
var router = express.Router();
const { User } = require('../db/models');
const { checkUser, deepCheckUser } = require('../middlewares/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* Show login form */
router.get('/login', (req, res)=> {
  res.render('login');
});

/* Login to user */
router.post('/login', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.redirect('/users/register');
  }
  if (user.password === req.body.password) { 
    req.session.userName = user.name; 
    req.session.userEmail = user.email;
    req.session.userId = user.id;
    res.redirect(`/users/${user.id}`);
  } else {
    res.send(`wrong pasword!`);
  }
});

/* Show registration form */
router.get('/register', (req, res)=> {
  return res.render('users/register');
});

/* Add new user record */
router.post('/', async(req, res)=> {
  const {name, email, password} = req.body;
  const user = await User.create({ name, email, password }); // Add new user to database
  req.session.userName = user.name; // Add user details to session
  req.session.userEmail = user.email;
  req.session.userId = user.id;
  res.redirect(`/users/${user.id}`); // Redirect to user profile
});

/* Logout from current user */
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('userCookie');
  res.redirect('/');
});

/* Show the user's profile */
router.get('/:id', checkUser, deepCheckUser, async(req, res)=> {
  const user = await User.findByPk(req.params.id);
  res.render('users/profile', { user });
});
module.exports = router;
