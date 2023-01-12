const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://Rohan:7pQ0RO0aTBMj0jQ5@cluster0.4drx5fx.mongodb.net/MusicWeb?retryWrites=true&w=majority')
.then(()=>{
    console.log('database connected...')
})
.catch((err)=>{
    console.log(err)
})