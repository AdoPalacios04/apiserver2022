const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.port;
        this.usuariosPath = '/api/usuarios';

        //Conectar db
        this.conectarDB();


        /* Codigo de capa intermedia MIDDLEWARES */
        this.middlewares();

        /* RUTAS DE INGRESO AL SERVER */
        this.routes();
    }

    //METODO PARA INVOCAR EL CODIGO DE CONEXION A LA BASE DE DATOS
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        /**Politica de acceso CORS para publicacion web */
        this.app.use(cors());

        /**Parse json */
        this.app.use(express.json());

        /** Accesos publicos */
        this.app.use(express.static('public'));
    }
    
    routes(){
      this.app.use(this.usuariosPath,require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor API REST corrriendo en puerto: ", process.env.port)
        })
    }

}

module.exports = Server;