const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({ success: false, message: "No token provided" });
        }

        // format: Bearer token
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, "SECRET_KEY");

        // attach user to request
        req.user = decoded;

        next();

    } catch (err) {
        return res.json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;