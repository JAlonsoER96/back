/**
 * @author Jose Alonso Espinares Romero
 * @description Configuracion de servidor REST Nodejs-expressjs
 * @copyright 
 */

/** 
 * @author Jose Alonso Espinares Romero
 * @description Importación de modulos usando ECMASCRIPT 6
 * Se require del paquete babel para esto
*/
import express from "express"
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from './routes/'

/** 
 * @author Jose Alonso Espinares Romero
 * @description Conexion a la base de datos usando el ORM mongoose
*/
mongoose.Promise = global.Promise
//const dbURL = 'mongodb://localhost:27017/dbsistema'
const dbURL = 'mongodb+srv://JAlonso:X53QUfyQymiz2L5Z@sistemamevn.jvrw8.mongodb.net/dbsistema?retryWrites=true&w=majority'

mongoose.connect(dbURL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(mongoose => console.log('Conectado a la pase de datos'))
  .catch(err => console.log(err));

const app = express();
require("dotenv").config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use('/api', router)

/**
 *@author Jose Alonso Espinares Romero
 *@description Congiguración del puerto 
 */
const PORT = process.env.PORT || 3000
var server = app.listen(PORT, function () {
  let host = 'localhost'
  let port = server.address().port
  console.log("Aplicación montada en http://%s:%s", host, port);
})