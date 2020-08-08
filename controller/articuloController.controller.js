import models from '../models'

export default {
    /**
     *@author Jose Alonso Espinares Romero
     *@description Funcion para agregar documento
    */
    add: async(req, res, next)=>{
        try {
            const reg = await models.Articulo.create(req.body)
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    /**
     * @author Jose Alonso Espinares Romer
     * @description Consulta por ID
    */
    query: async(req, res, next)=>{
        try {
            const reg = await models.Articulo.findOne({_id:req.query._id}).populate('categoria',{nombre:1})
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
    queryCodigo: async(req, res, next)=>{
        try {
            const reg = await models.Articulo.findOne({codigo:req.query.codigo}).populate('categoria',{nombre:1})
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
            const reg = await models.Articulo.find({$or:[
                {'nombre': new RegExp(valor,'i')}, //filtro por nombre
                {'descripcion':new RegExp(valor,'i')} //filtro por descripción
            ]},
            {createdAt:0}).populate('categoria',{nombre:1}).sort({'createdAt': -1})//Listado por fecha de creación orden descendente
            //Populate crea la refencia a un documento de otra collección
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},
            {
                categoria:req.body.categoria,
                codigo: req.body.codigo,
                nombre:req.body.nombre,
                descripcion:req.body.descripcion,
                precio_venta:req.body.precio_venta,
                stock:req.body.stock

            });
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
            const reg = await models.Articulo.findByIdAndDelete({_id:req.body._id})
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:1})
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
            const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},
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