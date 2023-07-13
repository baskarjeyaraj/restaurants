var jwt = require('jsonwebtoken');
const fs = require('fs')
var privateKey = fs.readFileSync('private.key');
const generateToken = (userEmail) => 
{
    const token = jwt.sign
    (
        { userEmail },
        privateKey,
        {
            expiresIn: 3457345,
            algorithm: "HS256",
        }
    );
    return token;
};
const verifyRequest = async (req, res, next) => 
{
        var secretkey = privateKey;
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        console.log(token);
        if (token)
        {
            if (token.startsWith("Bearer ") || token.startsWith("bearer ")) 
            {
                token = token.slice(7, token.length);
            }
            await jwt.verify
            (
            token, secretkey, async (err, decoded) => 
            {
            if (err) 
            {
            return res.status(400).json
            (
            {
            success: false,
            message: "Access Denied: Invalid token provided with request"
            }
            );
            } 
            else 
            {
            next();
            }
            }
            );

            }
            else 
            {
                return res.status(400).json
                (
                {

                    
                 success: false,
                 message: "Auth token is not supplied"
                }
            );
        }
};
module.exports = 
{
    generateToken,
    verifyRequest
};