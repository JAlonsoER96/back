import  models from '../models'


export default {
    //Anadir documento
    add: async(req, res, next)=>{
        try {
            const reg = await models.Categoria.create(req.body)
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Consultar documento
    query: async(req, res, next)=>{
        try {
            const reg = await models.Categoria.findOne({_id:req.query._id})
            if (!reg) {
                res.status(404).send({
                    message: "El registro no existe"
                })
            }else{
                res.status(200).json(reg)
            }
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Listar documentos
    list: async(req, res, next)=>{
        try {
            let valor = req.query.valor;
            const reg = await models.Categoria.find({$or:[
                {'nombre': new RegExp(valor,'i')}, //filtro por nombre
                {'descripcion':new RegExp(valor,'i')} //filtro por descripción
            ]},
            {createdAt:0}).sort({'createdAt': -1})//Listado por fecha de creación orden descendente
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //actualizar documento
    update: async(req, res, next)=>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},
            {nombre:req.body.nombre,descripcion:req.body.descripcion});
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //eliminar documento
    remove: async(req, res, next)=>{
        try {
            const reg = await models.Categoria.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Activar documento
    activate: async(req,res, next)=>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{estado:1})
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Desactivar Documento
    deactivate: async(req, res, next)=>{
        try {
            const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},
                {estado:0})
                res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    }
}