import categoriaRouter from './categoria'
import articuloRouter from './articulo'
import usuarioRouter from './usuario'
import routerx from 'express-promise-router'
const router = routerx()

router.use('/categoria', categoriaRouter)
router.use('/articulo', articuloRouter)
router.use('/usuario',usuarioRouter)
export default router;