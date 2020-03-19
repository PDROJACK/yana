const jwt = require('jsonwebtoken');

const userAuth = function(req,res,next){
    try {
        const token = req.headers.authorization;
        console.log(token);
        const valid = jwt.verify(token,'secretkey');
        res.userData = valid;
        next();
    } catch(err) {
        res.status(500).json({
            error:err
        });
    }
}

module.exports = {
    userAuth
}