import routerx from 'express-promise-router'
import ventaController from '../controller/ventaController.controller'
import auth from '../middlewares/auth'

const router = routerx()

router.post('/add', auth.verifyVendedor, ventaController.add)
router.get('/query', auth.verifyVendedor,  ventaController.query)
router.get('/list', auth.verifyVendedor,ventaController.list)
router.get('/grafico12meses', auth.verifyVendedor,  ventaController.graficos12meses)
router.get('/ventaFechas',  auth.verifyVendedor, ventaController.consultaFechas)
router.put('/deactivate', auth.verifyVendedor, ventaController.deactivate)
router.put('/activate', auth.verifyVendedor, ventaController.activate)

export default router