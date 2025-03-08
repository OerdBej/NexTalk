import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  console.log("generateToken");

  //here to create the token in order to differentiate the users from each others with
  const token  = jwt.sing({userId}, process.env.JWT_SECRET, {expiresIn: '10d'} )

  //here to send the token in the cookies
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    secure: process.env.NODE_ENV !== 'development', //true in production, false in development
  });
  return token;
}