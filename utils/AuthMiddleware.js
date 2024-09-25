class AuthMiddleware {
    
    isAuthenticated(req, res, next) {
        if (req.session.userId && req.session) {
            return next(); 
        }
        res.redirect('/login'); 
    }
    isAuthenticatedAdmin(req,res,next){
        if(req.session.userId && req.session.isAdmin === true){
            return next()
        }
        res.status(403).send('Access denied. Only admin can access this route.');

    }

}

module.exports = new AuthMiddleware();