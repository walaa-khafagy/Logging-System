export const errorHandler = async (error, request, response, next)=> {
    console.error(error);
    
    response.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;