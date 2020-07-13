import routerx from 'express-promise-router'
import articuloController from '../controller/articuloController.controller'

const router = routerx();

router.post('/add', articuloController.add)
router.get('/query', articuloController.query)
router.get('/queryCodigo', articuloController.queryCodigo)
router.get('/list', articuloController.list)
router.put('/update', articuloController.update)
router.put('/deactivate', articuloController.deactivate)
router.put('/activate', articuloController.activate)
router.delete('/remove', articuloController.remove)

export default router