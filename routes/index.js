import categoriaRouter from './categoria'
import articuloRouter from './articulo'
import routerx from 'express-promise-router'
const router = routerx()

router.use('/categoria', categoriaRouter)
router.use('/articulo',articuloRouter)
export default router;