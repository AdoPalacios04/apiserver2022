const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        required: [true,'El nombre es requerido']
    },
    correo: {
        type:String,
        required: [true,'El correo es requerido']
    },
    password: {
        type:String,
        required: [true,'El password es requerido']
    },
    img: {
        type:String
    },
    rol: {
        type:String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:true
    },
});

module.exports = model('Usuario', UsuarioSchema);

/*{
    nombre:'',
    correo:'',
    password:'',
    img:'',
    rol:'',
    estado:false
}*/