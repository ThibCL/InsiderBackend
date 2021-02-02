import { sign } from "jsonwebtoken"
import { Connection, createConnection } from "typeorm"
import { User } from "../src/entity/User"
import { OAuth2Client } from "google-auth-library"

export class Handler {
  client: OAuth2Client

  constructor(clientId: string) {
    this.client = new OAuth2Client(clientId)
  }

  login = async (req, res) => {
    const ticket = await this.client.verifyIdToken({
      idToken: req.body.token,
      audience: [
        "578157949333-l0ufg3vlp0l0msbbdloq3nna5bdm2r66.apps.googleusercontent.com",
        "578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com",
      ],
    })
    console.log("verified")
    const payload = ticket.getPayload()
    const userid = payload["sub"]
    console.log(payload)
    console.log(userid)

    let connection: Connection
    let user
    try {
      connection = await createConnection()
      const userRepo = connection.getRepository(User)

      user = await userRepo.findOne({ id: userid })
      console.log(user)
    } catch (e) {
      console.log(e)
    } finally {
      await connection.close()
    }

    let token = ""
    if (user) {
      token = sign({ id: payload["sub"] }, "secret", {
        expiresIn: "24h", // expires in 24 hours
      })
    }

    if (token != "") {
      res.statusCode = 200
      res.send(JSON.stringify({ token: token }))
    } else {
      res.statusCode = 401
      res.send(JSON.stringify({ error: "User does not exist" }))
    }
  }
}
