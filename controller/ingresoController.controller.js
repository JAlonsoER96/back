import models from '../models'

async function aumentarStock(idarticulo, cantidad) {
    let { stock } = await models.Articulo.findOne({ _id: idarticulo })
    let nStock = parseInt(stock) + parseInt(cantidad);
    const reg = await models.Articulo.findByIdAndUpdate({ _id: idarticulo }, { stock: nStock })
}
async function disminuirStock(idarticulo, cantidad) {
    let { stock } = await models.Articulo.findOne({ _id: idarticulo })
    let nStock = parseInt(stock) - parseInt(cantidad);
    const reg = await models.Articulo.findByIdAndUpdate({ _id: idarticulo }, { stock: nStock })
}

export default {
    //Anadir documento
    add: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.create(req.body)
            let detalles = req.body.detalles;
            detalles.map(function (x) {
                aumentarStock(x._id, x.cantidad)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Consultar documento
    query: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findOne({ _id: req.query._id })
                .populate('usuario', { nombre: 1 })//embed a modelo usuario
                .populate('persona', { nombre: 1 })//embed a modelo persona
            if (!reg) {
                res.status(404).send({
                    message: "El registro no existe"
                })
            } else {
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
    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Ingreso.find({
                $or: [
                    { 'num_comprobante': new RegExp(valor, 'i') }, //filtro por nombre
                    { 'serie_comprobante': new RegExp(valor, 'i') } //filtro por descripción
                ]
            })
                .populate('usuario', { nombre: 1 })//embed a modelo usuario
                .populate('persona', { nombre: 1 })//embed a modelo persona
                .sort({ 'createdAt': -1 })//Listado por fecha de creación orden descendente
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //actualizar documento
    /*update: async(req, res, next)=>{
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id:req.body._id},
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
            const reg = await models.Ingreso.findByIdAndDelete({_id:req.body._id})
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },*/
    //Activar documento
    activate: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({ _id: req.body._id }, { estado: 1 })
            let detalles = reg.detalles;
            detalles.map(function (x) {
                aumentarStock(x._id, x.cantidad)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    //Desactivar Documento
    deactivate: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({ _id: req.body._id },
                { estado: 0 })
            let detalles = reg.detalles;
            detalles.map(function (x) {
                disminuirStock(x._id, x.cantidad)
            })
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    },
    graficos12meses: async (req, res, next) => {
        try {
            const reg = await models.Ingreso.aggregate(
                [
                    {
                        $group: {
                            _id: {
                                mes: { $month: "$createdAt" },
                                year: { $year: "$createdAt" }
                            },
                            total: { $sum: "$total" },
                            numero: { $sum: 1 }
                        }
                    },
                    {
                        $sort: {
                            "_id.year": -1, "_id.mes": -1
                        }
                    }
                ]
            ).limit(12)
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    },
    consultaFechas: async (req, res, next) => {
        let start = req.query.start
        let end = req.query.end
        try {
            let valor = req.query.valor;
            const reg = await models.Ingreso.find({
                "createdAt": { "$gte": start, "$lt": end }
            })
                .populate('usuario', { nombre: 1 })//embed a modelo usuario
                .populate('persona', { nombre: 1 })//embed a modelo persona
                .sort({ 'createdAt': -1 })//Listado por fecha de creación orden descendente
            res.status(200).json(reg)
        } catch (error) {
            res.status(500).send({
                message: "Ocurrio un error"
            })
            next(error)
        }
    }
}