import jwt from "jsonwebtoken";

export const tokenValidation = (token) => {
  if (!token) return false;
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (decodedToken) {
    return decodedToken;
  }
  return false;
};

const validateUser = (req, res) => {
  const valid = tokenValidation(req.cookies?.userToken);
  if (valid) {
    res.status(200).send({
      success: true,
    });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized Access" });
  }
};

export default validateUser;
