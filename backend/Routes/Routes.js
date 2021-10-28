const express =require('express');
const router = express.Router();
const UsuarioRoutes = require('./UsuariosRoutes');
router.post('/Usuarios/Login/Token',UsuarioRoutes.LogearUsuarioToken);

module.exports = router;