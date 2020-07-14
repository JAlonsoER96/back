import routerx from 'express-promise-router'
import ingresoController from '../controller/ingresoController.controller'
import auth from '../middlewares/auth'

const router = routerx();

router.post('/add', auth.verifyAlmacenero,ingresoController.add)
router.get('/query', auth.verifyAlmacenero,  ingresoController.query)
router.get('/list', auth.verifyAlmacenero,ingresoController.list)
router.get('/grafico12meses', auth.verifyAlmacenero,  ingresoController.graficos12meses)
router.get('/ingresoFechas', auth.verifyAlmacenero,  ingresoController.consultaFechas)
router.put('/deactivate', auth.verifyAlmacenero, ingresoController.deactivate)
router.put('/activate', auth.verifyAlmacenero, ingresoController.activate)

export default router