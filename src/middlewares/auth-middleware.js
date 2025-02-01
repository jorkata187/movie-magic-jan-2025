import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['auth']; 

    if (!token) {
       return next();
    }

    // Validate token
    try {
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (err) {
        // When invalid token: clear cookie and redirect to login
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};
