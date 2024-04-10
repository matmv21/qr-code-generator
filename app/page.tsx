"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <main>
      <Card />
    </main>
  );
}

function Card() {

  const [input, setInput] = useState("")
  const [qr, setQr] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const getQRCode = async (e) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const res = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${input}&size=200x200`)
      console.log(res)
      setQr(res.url)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <form className="form" onSubmit={getQRCode}>
        <h1 className="title text-3xl font-bold">Qr Code Generator</h1>
        <input 
          type="text" 
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          placeholder="Enter a URL or a text..."
        />

        {isLoading && <div className="loading"><span>Loading...</span></div>}

        {!isLoading && (qr ? <img className="qr_code" src={qr} alt="qr_code" /> : <div className="loading">Generate QR Code for you and your friends!</div>)}

        <input type="submit" className="submit" value="Generate QR Code"/>

      </form>
  );
}