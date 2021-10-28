const express =require('express');
const UsuarioRoutes = express.Router();
const UsuarioController=require('../Controllers/UsuariosController');
UsuarioRoutes.LogearUsuarioToken=(UsuarioController.LogearUsuarioToken);

module.exports = UsuarioRoutes;