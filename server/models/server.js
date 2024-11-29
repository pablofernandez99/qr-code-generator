const express = require("express")
const cors = require("cors")

const routes = require("../routes")

class Server {
    constructor() {
        this.PORT = process.env.PORT || 8080
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use("/", routes)
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Running at port ${this.PORT}`)
        })
    }

}

module.exports = Server