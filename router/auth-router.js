const { Router } = require('express');
const router = Router();


router
  .route('/register')
  .post(async (req, res) => {
    /* POST  */
  });

router
  .route('/login')
  .post(async (req, res) => {
    /* POST  */
  });


module.exports.router = router;