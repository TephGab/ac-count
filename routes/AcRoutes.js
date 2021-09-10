const router = require('express').Router();
const acController = require('../controllers/AcController');
const oldAcController = require('../controllers/OldAcController');
// const auth = require('../middleware/Auth');

router.get('/', acController.getAc);
router.post('/', acController.addAc);
router.patch('/:id', acController.updateAc);
router.delete('/:id', acController.deleteAc);
// router.post('/', oldAcController.addOldAc);

module.exports = router;