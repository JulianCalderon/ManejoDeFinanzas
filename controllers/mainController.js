// Exportacion del middleware para solo dar acceso a usuarios autenticados previamente
exports.authMiddleware = (req, res, next) => {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('auth/login');
	}
}