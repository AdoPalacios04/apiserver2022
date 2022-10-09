require('dotenv').config(); 
const Server = new require('./models/server');

const server = new Server();
server.listen();
