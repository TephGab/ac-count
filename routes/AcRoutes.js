const router = require('express').Router();
const acController = require('../controllers/AcController');
// const auth = require('../middleware/Auth');

router.get('/', acController.getAc);
router.post('/', acController.addAc);
router.patch('/:id', acController.updateAc);
// router.delete('/:id', acController.deleteAc);

module.exports = router;