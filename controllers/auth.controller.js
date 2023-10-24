const { response } = require("express");
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const { getMenuFrontend } = require("../helpers/menu-frontend");



const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {


        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado',
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar token JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            menu: getMenuFrontend( usuarioDB.rol )
        });

            
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false, 
            msg: 'Error inesperado... revisar logs',
        });
    }

}


const renewToken = async(req, res = response ) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid )

    // Obtener el Usuario por UID 

    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenuFrontend( usuario.rol )
    })
}

module.exports = {
    login,
    renewToken
}