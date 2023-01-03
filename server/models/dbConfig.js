const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://Priyanshi:abcd1234@cluster0.cxxtr0f.mongodb.net/MusicApp1?retryWrites=true&w=majority')
.then(()=>{
    console.log('database connected...')
})
.catch((err)=>{
    console.log(err)
})