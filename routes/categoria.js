import routerx from 'express-promise-router'
import categoriaController from '../controller/categoriaController.controller'
import auth from '../middlewares/auth'

const router = routerx();

router.post("/add",auth.verifyAlmacenero, categoriaController.add)
//router.post("/add", categoriaController.add)
router.get('/query',auth.verifyAlmacenero, categoriaController.query)
router.get('/list',auth.verifyAlmacenero, categoriaController.list)
//router.get('/list',categoriaController.list)
router.delete('/remove',auth.verifyAlmacenero,categoriaController.remove)
router.put('/update',auth.verifyAlmacenero, categoriaController.update)
//router.put('/update', categoriaController.update)
router.put('/activate',auth.verifyAlmacenero, categoriaController.activate)
router.put('/deactivate',auth.verifyAlmacenero,categoriaController.deactivate)
//router.put('/activate',  categoriaController.activate)
//router.put('/deactivate',categoriaController.deactivate)

export default router;