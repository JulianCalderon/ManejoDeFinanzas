// app hace referencia a un servidor que viene ya configurado desde la ruta ./config/server
const app = require('./config/server');
// app.listen() activa el servidor y lo deja escuchando en el puerto indicado
app.listen(app.get('port'), listeningFunction);
//funcion que se ejecuta mientras el servidor escucha
function listeningFunction(){
	console.log(`Listening on port ${app.get('port')}`);
}