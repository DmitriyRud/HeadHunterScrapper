var express = require('express');
var router = express.Router();
const { AllSkill } = require('../db/models');



/* GET home page. */
router.get('/', async (req, res, next)=> {
  const countSkills = (req.cookies.countskills)? req.cookies.countskills : 10;
  //console.log(countSkills);
  try {
  allskills = await AllSkill.findAll();
} catch {
  console.log('Log is empty');
}
// products = products.map(obj=>{
//   if (obj.user_id === res.locals.userId) obj.current = res.locals.userName; 
//   return obj;
// });
allskills.sort((a, b)=>b.count - a.count);
allskills.length = countSkills;
res.render('index', {allskills});
});




module.exports = router;
