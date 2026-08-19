const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', noteController.list);
router.post('/', noteController.create);
router.get('/:id', noteController.detail);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

module.exports = router;