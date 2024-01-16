import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenValidation = (req, res) => {
  const token = req.cookies?.userToken;
  const refreshToken = req.cookies?.refreshToken;
  if (!token) return false;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) return decodedToken;
    else throw Error();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET
      );
      if (decodedRefreshToken) {
        const newAccessToken = jwt.sign(
          { id: decodedRefreshToken.id, isAdmin: decodedRefreshToken.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "20m" }
        );
        res.cookie("userToken", newAccessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return decodedRefreshToken;
      } else {
        return false;
      }
    }
  }
};

const validateUser = (req, res) => {
  const valid = tokenValidation(req, res);
  if (valid) {
    res.status(200).send({
      success: true,
    });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized Access" });
  }
};

export default validateUser;
