const { validateToken } = require("../services/authentication");





function checkForAuthentactionCookie(cookieName){
    return(req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName]; 

        if(!tokenCookieValue){
          return  next(); 

        }
        try{
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; 
           
            

        }
        catch(error){
         
        }
        next(); 


    }
}; 


module.exports = {
    checkForAuthentactionCookie,

}