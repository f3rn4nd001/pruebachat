const mongoose =require('mongoose');
const {Schema} =mongoose;
let rolV={
    values:['Admin','Usuario'],
    message:'{VALUE} no es un rol'
};
let sexoV={
    values:['Hombre','Mujer'],
    message:'{VALUE} no es un rol'
};
const usuarioShema =Schema({
    Nombre:{type:String, require:true,maxlength: 30},
    Correo:{type:String, unique:true ,trim: true,require:true},
    Contraseña:{type:String, require:true, unique:true },
    imagen:{type:Array, require:false },
    role:{type:String, default:'Usuario',enum:rolV},
    Sexo:{type:String, enum:sexoV,require:false},
    Edad:{type:Date, require:false},
    Telefono:{type:String, require:true},
    CURP:{type:String,require:false},
    Promoción:{type:String,require:false}, 
    Problema:{type:String,require:false},
    Prioridad:{type:String, require:false}
});
module.exports=mongoose.model('usuarioModel',usuarioShema);