const QRCode = require("qrcode")

const formData = (data) => {
    const qrCodeText = `Product ID: ${data.id}, Price: ${data.price}`

    return qrCodeText
}

const generateQRCode = async (qrCodeText) => {
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, {
        errorCorrectionLevel: "M",
        type: "image/png",
        margin: 1
    })

    return qrCodeBuffer
}

module.exports = {
    formData,
    generateQRCode
}