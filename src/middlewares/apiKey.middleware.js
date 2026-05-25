import Developer from "../developers/developers.model.js";

export default async function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || typeof apiKey !== "string") {
    return res.status(401).json({
      message: "API key is required"
    });
  }

  const user = await Developer.findOne({ apiKey });

  if (!user) {
    return res.status(401).json({
      message: "Invalid API Key"
    });
  }

  req.developer = user;

  next();
}