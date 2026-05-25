import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
    try {
        const { authorization } = request.headers;

        if (!authorization || typeof authorization !== "string") {
            return response.status(401).json({ message: "Unauthorized" });
        }

        const authorizationParts = authorization.split(" ");

        if (authorizationParts.length !== 2 || authorizationParts[0] !== "Bearer" || !authorizationParts[1]) {
            return response.status(401).json({ message: "Invalid authorization format" });
        }

        const token = authorizationParts[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        request.user = { id: decodedToken.id };

        next();
    } catch (error) {
        return response.status(401).json({ message: "Invalid or expired token" });
    }
};

export default authMiddleware;