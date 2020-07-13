import tokenService from '../services/token'

export default{
    verifyUsuario: async(req, res,next)=>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if (response.rol == 'Administrador' || response.rol == 'Almacenero' || response.rol == 'Vendedor') {
            next()
        }else{
            return res.status(403).send({
                message:'No Autorizado'
            })
        }
    },
    verifyAdministrador: async(req, res, next)=>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if (response.rol == 'Administrador') {
            next()
        }else{
            return res.status(403).send({
                message:'No Autorizado'
            })
        }

    },
    verifyAlmacenero: async(req, res, next)=>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if (response.rol == 'Administrador' || response.rol == 'Almacenero') {
            next()
        }else{
            return res.status(403).send({
                message:'No Autorizado'
            })
        }
    },
    verifyVendedor: async(req, res, next)=>{
        if(!req.headers.token){
            res.status(404).send({
                message: 'No Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if (response.rol == 'Administrador' || response.rol == 'Vendedor') {
            next()
        }else{
            return res.status(403).send({
                message:'No Autorizado'
            })
        }
    }
}