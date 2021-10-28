const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://fernando:asdfqwer@cluster0.8ajbx.mongodb.net/chat?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,
})

.then(db => console.log("base conectada"))
.catch(err=> console.error(err));

module.exports=mongoose