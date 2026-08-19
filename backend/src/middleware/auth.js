const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    const header = req.headers.authorization;

    if(!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({message:'未提供token'});
    }

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:'token无效'});
    }
};