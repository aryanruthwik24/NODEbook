const mongoose= require('mongoose');

const NotesSchema =new mongoose.Schema({
    email: {
        type: String,
        required: true,
        
    },
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    tag:{
        type: String,
        
    },
   
   

});

module.exports = mongoose.model('notes',NotesSchema);