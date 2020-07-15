import models from '../models'
import bcrypt from 'bcrypt'
import token from '../services/token'

export default {
    //Anadir documento
    add: async(req, res, next)=>{
        req.body.password = await bcrypt.hash(req.body.password,10)
        try {
            const reg = await models.Usuario.create(req.body)
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
            const reg = await models.Usuario.findOne({_id:req.query._id})
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
            const reg = await models.Usuario.find({$or:[
                {'nombre': new RegExp(valor,'i')}, //filtro por nombre
                {'email':new RegExp(valor,'i')} //filtro por descripción
            ]},
            {createdAt:0}).sort({'createdAt': -1})//Listado por fecha de creación orden descendente
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
            let pass = req.body.password
            const reg0 = models.Usuario.findOne({_id:req.body._id})
            if(pass!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10)
            }
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},
            {
                rol: req.body.rol,
                nombre:req.body.nombre,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direccion:req.body.direccion,
                telefono: req.body.telefono,
                email:req.body.email,
                password:req.body.password
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
            const reg = await models.Usuario.findByIdAndDelete({_id:req.body._id})
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1})
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:req.body._id},
                {estado:0})
                res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    login: async(req, res, next)=>{
        try {
            let user = await models.Usuario.findOne({email:req.body.email,estado:1})
            if (user) {
                let match = await bcrypt.compare(req.body.password,user.password)
                if (match) {
                    let tokenReturn = await token.encode(user._id,user.rol,user.email)
                    res.status(200).json({user,tokenReturn})
                }else{
                    res.status(404).send({
                        mesagge:'El password es incorrecto'
                    })
                }
            }else{
                res.status(404).send({
                    message: "No existe el usuario"
                })
            }
        } catch (error) {
            
        }
    }
}

