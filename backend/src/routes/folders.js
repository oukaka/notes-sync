const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', folderController.list);
router.post('/',folderController.create);
router.get('/:id', folderController.detail);
router.put('/:id', folderController.update);
router.delete('/:id', folderController.remove);

module.exports = router;