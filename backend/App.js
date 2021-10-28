const expres =require('express');
const morgan =require('morgan');
const session =require('express-session');
const cors =require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('./Modelos/UsuariosModel');
const app=expres();
const {mongoose} =require('./Database');

const http = require("http");

const { Server } = require("socket.io");
app.use(cors());
app.use(session({
  limit: "200mb",
  secret:'ldskaldklsa',
  resave:true,
  saveUninitialized:true
}));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
  
});

app.set('port', process.env.POR || 3000)

app.use('/api' ,require('./Routes/Routes'));
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("Clave", (data) => {
    socket.join(data.room);

    console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
    
  });
  //logear
  socket.on("/api/Usuarios/Login",async (data) => {
    const {Correo,Contraseña}=(data);
    
    const errors = [];
    if (!Correo) {
      socket.emit("mensaje",{message: 'El campo email no puede estar vacío','success':false,});
      errors.push({ text: 'El campo email no puede estar vacío','success':false});} 
    if(!/^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/i.test(Correo)){
      socket.emit("mensaje",{message: 'El formato de gmail no es válido','success':false,});
      errors.push({ text: 'El formato de gmail no es válido'});
    }
    if (!Contraseña ) {
      socket.emit("mensaje",{message: 'El campo contraseña no puede estar vacío','success':false,});
      errors.push({ text: 'El campo contraseña no puede estar vacío','success':false});
    } 
 
    if (errors.length > 0) {
        console.log({errors,});
    }
    else{
      console.log("entra aelse");
      const emailUsuario = await usuarioModel.findOne({Correo:Correo});
      if(emailUsuario) {
        if(bcrypt.compareSync(Contraseña,emailUsuario.Contraseña)){
          const token =jwt.sign({usuario:emailUsuario._id,role:emailUsuario.role},'token-de-desarrollo',{expiresIn: 60*60*24});
          socket.emit("mensaje",{message:"mensaje ",'Token':token,'success':true})
        }
        else{
        socket.emit("mensaje",{message:"La contraseña no es válida inténtelo de nuevo",'success':false})  
        }
      }
      else{
        socket.emit("mensaje",{message: "EL email no es válida",'success':false,});
       
      }
    }
  })

  //registrar usuarios
  socket.on("/api/Usuarios",async (data,res) => {
    const {Nombre,Teléfono,Contraseña,Correo,ConfiContraseña}=(data);
    const errors = [];
    const guardado = [];
    if(!/^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/i.test(Correo)){
      socket.emit("mensaje",{message: 'El formato de gmail no es válido '});
    }
    if(Contraseña != ConfiContraseña){
      socket.emit("mensaje",{message: 'La contraseña no coincide','success':false});  
    }  
    if (errors.length > 0) {
      console.log({errors,});
    } 
    else {
      const emailUsuario =await usuarioModel.findOne({Correo:Correo});
      if(emailUsuario) {
        socket.emit("mensaje",{message:"El gmail ya fue registrado con anterioridad",'success':false});
      } 
      else {
        socket.emit("mensaje",{message:'Ya fuistes registrado con éxito :)','success':true});
          const usuario = await new usuarioModel({Contraseña:bcrypt.hashSync(Contraseña,10),Nombre,Correo,Teléfono});
          console.log(await usuario.save());
      }  
    }
  });



  socket.on("send_message",async (data) => {
    await socket.to(data.room).emit("receive_message", data);
   console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
