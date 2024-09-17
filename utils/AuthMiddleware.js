class AuthMiddleware {
    
    isAuthenticated(req, res, next) {
        if (req.session.userId && req.session) {
            return next(); 
        }
        res.redirect('/login'); 
    }
}

module.exports = new AuthMiddleware();