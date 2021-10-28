
   
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../Modelos/UsuariosModel');
const UsuarioController ={}


UsuarioController.LogearUsuarioToken =  async (req,res,next)=>{ 
    const {token}=(req.headers);
    jwt.verify(token,'token-de-desarrollo',(err ,decode)=>{
        if(err){
           console.log('Esta funsion esta desabilitada si no se cuentas registrado');
        }
        else{
            req.usuarioToken=decode.usuario;
        }
     });
    
     const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
     if(idToken){
        const token =jwt.sign({usuario:idToken._id,role:idToken.role
        },'token-de-desarrollo',{expiresIn: 60*60*24});
        res.send({'Token':token,message:"Token correcto",'success':true})
        }
        else{
            console.log('no res');
            res.send({'success':false})
        }
}
module.exports=UsuarioController;