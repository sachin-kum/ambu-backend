const jwt = require('jsonwebtoken');
const userModel = require('.././model/users/users')

exports.authentication = async(req, res, next) => {
    try {
        const {token} = req.query
        // console.log("token", token)
        if(!token) {
            return(
                res.status(200).json({message:` not found token`,status:false})
                )
        }

        const verification_token = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log(verification_token)
        if( verification_token.id){
            const findData = await userModel.findOne({_id: verification_token.id})
        console.log("token", findData)
            
            if(findData){
                req.user = findData
                next()
            }else{
                return (
                    res.status(403).json({message: 'user not exist', status:true})
                )
            }

         }

    } catch (error) {
        console.log(error);
    }
}
