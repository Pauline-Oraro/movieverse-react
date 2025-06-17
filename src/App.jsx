import Search from './components/search'
import React, { useState } from 'react'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className='pattern'/>

      {/*wrap the header*/}
      <div className='wrapper'>
        <header>

          <img src="./hero.png" alt="herobanner" />
          <h1>Find  <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>
        </header>

       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

       
      </div>
    </main>
  )
}

export default App

