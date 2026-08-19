const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.use(auth);

router.post('/', upload.single('file'), fileController.upload);
router.get('/', fileController.list);
router.get('/:id/download', fileController.download);
router.delete('/:id', fileController.remove);

module.exports = router;