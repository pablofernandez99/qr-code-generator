const service = require("../helpers/service")

const generateQR = async (req, res) => {
    try {
        const { id, price } = req.body
        const data = {
            id,
            price
        }

        const qrCodeText = service.formData(data)
        const qrCodeBuffer = await service.generateQRCode(qrCodeText)

        res.setHeader('Content-Disposition', 'attachment;filename=qrcode.png')

        res.type('image/png').send(qrCodeBuffer)

    } catch (error) {
        console.error("Error generatinr QR code", error)
        res.status(500).send({
            error: "Internal Server Error"
        })
    }
}

module.exports = {
    generateQR
}