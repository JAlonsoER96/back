import routerx from 'express-promise-router'
import articuloController from '../controller/articuloController.controller'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add',auth.verifyAlmacenero, articuloController.add)
router.get('/query',auth.verifyAlmacenero, articuloController.query)
router.get('/queryCodigo',auth.verifyAlmacenero, articuloController.queryCodigo)
router.get('/list',auth.verifyAlmacenero, articuloController.list)
router.put('/update',auth.verifyAlmacenero, articuloController.update)
router.put('/deactivate',auth.verifyAlmacenero, articuloController.deactivate)
router.put('/activate',auth.verifyAlmacenero, articuloController.activate)
router.delete('/remove',auth.verifyAlmacenero, articuloController.remove)

export default router