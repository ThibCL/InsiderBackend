import jwt = require("jsonwebtoken")

export const checkToken = (req, res, next) => {
  let token: string =
    req.headers["x-access-token"] || req.headers["authorization"] // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: err.message,
        })
      } else {
        req.body.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    })
  }
}
