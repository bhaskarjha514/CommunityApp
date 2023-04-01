const jwt  = require('jsonwebtoken');
var dotEnv = require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader || !token)
        return res.status(401).json({ error: "Authorization denied" });
    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
              res.status(401).json({error: "Unauthorized."});
            } else {
              console.log('Decode----',decoded);
              next();
            }
          });
    }catch(err) {
        console.log('Error---',err);
        res.status(401).json({
            error: "Unauthorized.",
        });
    }

};

module.exports = authenticate;