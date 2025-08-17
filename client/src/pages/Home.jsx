import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import QuoteForm from '../components/QuoteForm'

const Home = () => {

  const [showQuoteForm, setShowQuoteForm] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
        <Navbar showQuote = {()=>setShowQuoteForm(false)} />
        {
          !showQuoteForm ? (<Header showQuote = {()=>setShowQuoteForm(true)} />) : (<QuoteForm />)
        }

    </div>
  )
}

export default Home
