const router = require('express').Router()
const registrationController = require('../controller/registration.controller')



module.exports = router

// ===========================================
router.post('/', registrationController.insert)
router.get('/', registrationController.getAll)
router.get('/:id', registrationController.getOneById)
router.put('/:id', registrationController.updateById)
router.delete('/:id', registrationController.removeById)