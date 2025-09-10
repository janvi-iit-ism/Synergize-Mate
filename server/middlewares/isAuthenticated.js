import jwt from "jsonwebtoken";

const isAuthenticated= async(req, res, next)=>{
  // const token = req.cookies.authToken || req.header('Authorization')?.split(' ')[1];
      try {
        // const token = req.cookies.token;
        // const token = req.cookies.token|| req.header('Authorization')?.split(' ')[1];
        const token = req.cookies.token|| req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        req.user = { _id: decode.userId }; 
        next();
      } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({
          message: "Server error",
          success: false,
      });
      }
}

export default isAuthenticated;