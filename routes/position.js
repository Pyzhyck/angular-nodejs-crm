const express = require('express');
const controller = require('../controllers/position');
const passport = require('passport');
const router = express.Router();

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryID);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.remove);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.update);

module.exports = router;