import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: "No token provided" });

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Access granted", userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
}