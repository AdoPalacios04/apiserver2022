
const mongoose = require('mongoose');


const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true
        });

        console.log('La base de datos está ONLINE')
        
    } catch (error) {
        console.log('Error', Error);
        throw new Error('Error en la base de datos, verifique.');
    }
}

module.exports = {
    dbConnection
};
    
