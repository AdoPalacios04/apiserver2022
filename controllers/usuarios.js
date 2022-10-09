const {Router} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const existeEmail = require('express-validator');
const usuario = require('../models/usuario');

    const usuariosGet = async(req, res =response) => {

        const filter = {};
        const allUsers = await Usuario.find(filter);

        res.json({
            msg: 'Metodo get invocado desde el servidor',
            allUsers
        })
    }

    const usuariosPost = async(req, res = response) => {

        const {nombre, correo, password, rol} = req.body;
        const usuario = new Usuario({nombre, correo, password, rol});

        //Validar si el correo ya existe
        const existeEmail = await Usuario.findOne({correo});
        if(existeEmail){
            return res.status(400).json({
                msg:'Correo ya está registrado'
            });
        }

        //Encriptar
        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password,salt);

        await usuario.save();

        res.json({
            msg: 'Post API -- usuario post',
            usuario
        })
    }

    const usuariosPut = async(req, res =response) => {

        const {id} = req.params;
        const {password, google, correo, nombre, ...resto} = req.body;

        if(password){
            const salt = bcryptjs.genSaltSync(10);
            resto.password = bcryptjs.hashSync(password, salt);
        }

        resto.google = google;
        resto.correo = correo;
        resto.nombre = nombre;

        const usuario = await Usuario.findByIdAndUpdate(id,resto);

        res.json({
            msg: 'metodo PUT',
            usuario
        })
    }

const usuariosDelete = async(req, res =response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
  }