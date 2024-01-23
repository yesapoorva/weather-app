import jwt from 'jsonwebtoken'

 const requireSignin = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // req.user = decoded;
        const { id, email, iat, exp } = decoded;
        req.user = { id, email, iat, exp };
        next();
    });
};

export default requireSignin