import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState({ id: "", price: "" })
  const [qrImage, setQrImage] = useState("")
  const handleChangeValue = (e) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (Object.values(data).includes("")) {
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/generate-qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        id: data.id,
        price: data.price
       })
    })
      .then(response => response.blob())
      .then(blob => {
        const qrImageSrc = URL.createObjectURL(blob)

        setQrImage(qrImageSrc)
      })
      .catch(error => {
        console.error("Error generating QR Code:", error)
      })

  }

  return (
    <>
      <h1>QR Code Generator</h1>
      <form id="qr-form" onSubmit={handleFormSubmit}>
        <div className="content">
          <label htmlFor="qr-id" className="margin">ID:</label>
          <input
            value={data.id}
            onChange={handleChangeValue}
            type="text"
            name="id"
            className="qr-input"
            placeholder="Enter ID"
          />
        </div>
        <div className="content">
          <label htmlFor="qr-price">Price: </label>
          <input
            value={data.price}
            onChange={handleChangeValue}
            type="text"
            name="price"
            className="qr-input"
            placeholder="Enter Price"
          />
        </div>
        <button type="submit" className="content">Generate QR Code</button>
      </form>
      {qrImage && (
        <div className='qr-result'>
          <img src={qrImage} alt="qr-image" />
        </div>
      )}
    </>
  )
}

export default App
