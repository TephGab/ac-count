const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const tken = req.headers.Authtorization.split("")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'secret');

            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //sub is a special google name that referencing a user id
        }

        next();
    } catch (error) {
        
    }
}

module.exports.auth;