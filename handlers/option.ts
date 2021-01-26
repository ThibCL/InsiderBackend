import { Connection, createConnection } from "typeorm"
import { Option } from "../src/entity/Option"

export class Handler {
  getDefault = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const optionRepo = connection.getRepository(Option)
      const option = await optionRepo.findOne({ user: req.body.decoded.id })

      res.send(JSON.stringify({ option }))
    } catch (e) {
      console.log(e)
      res.send(JSON.stringify({}))
    } finally {
      await connection.close()
    }
  }

  saveDefault = async (req, res) => {
    let connection: Connection
    try {
      connection = await createConnection()
      const optionRepo = connection.getRepository(Option)
      let option: Option = req.body.option
      option.user = req.body.decoded.id
      optionRepo.save(option)

      res.send()
    } catch (e) {
      console.log(e)
      res.send()
    } finally {
      await connection.close()
    }
  }
}
