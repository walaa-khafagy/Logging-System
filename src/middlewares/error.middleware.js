export const errorHandler = async (error, request, response, next)=> {
    console.error(error);

    if (error.code === 11000 || error.name === "ValidationError" || error.name === "CastError")
    {
        return response.status(400).json({ message: "Invalid data." });
    }

    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError")
    {
        return response.status(401).json({ message: "Unauthorized" });
    }
    
    response.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;