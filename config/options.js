// Creacion del objeto 'options'
const options = {};
// Propiedades para las distintas configuaciones que requiere la aplicacion
// Opciones para el parseo de los datos de formularios
options.urlencodedOptions = {
	// para datos de formulario básicos (texto)
	extended: false
};
// Opciones de conexion a base de datos
options.dbOptions = {
	// servidor de base de datos
	host: 'localhost',
	// puerto del servidor de base de datos
	port: 3306,
	// usuario de accesos a la base de datos
	user: 'root',
	// contraseña de accesos a la base de datos
	password: '',
	// base de datos a utilizar
	database: 'finanzas'
};
// Opciones de almacenamiento de cookies y variables de session
options.sessionOptions = {
	// Id de la session (se cifra)
	secret: 'secret',
	// Almacenamiento de la sesion (se configura en el archivo del servidor)
	store: '',
	// Guarda la sesión sin haberse inicializado
	saveUninitialized: false,
	// Guarda la sesion sin importar si hubo cambios
	resave: false
};
// Opciones de redireccionamiento en la autenticacion
options.authOptions = {
	successRedirect: '/../user',
	failureRedirect: '/login'
}
// Exportacion del modulo de opciones
module.exports = options;