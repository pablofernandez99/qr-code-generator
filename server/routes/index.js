const express = require("express")
const router = express.Router()

const { generateQR } = require("../controllers")

router.post("/generate-qr", generateQR)

module.exports = router