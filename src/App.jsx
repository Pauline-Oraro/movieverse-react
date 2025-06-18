import Search from './components/search'
import Spinner from './components/spinner';
import React, { useState, useEffect  } from 'react'


{/*API is a set of rules that allow one application to talk to another one*/}

{/*TMDB API*/}
const API_BASE_URL =  'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}




const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

   const [movieList, setMovieList] = useState([]);

   const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () =>{
    setIsLoading(true)
    setErrorMessage('')
  try{
    {/*calling the api*/}
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    {/*fetch allows you to make http requests*/}
    const response = await fetch(endpoint, API_OPTIONS);

  if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
     

      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

  }catch(error){
    console.error(`error fetching movies: ${error}`);
    setErrorMessage('error fetching movies, please try again later')
  } finally{
    setIsLoading(false)
  }
 }

  useEffect(()=>{
    fetchMovies();
  }, [])

  return (
    <main>
      <div className='pattern'/>

      {/*wrap the header*/}
      <div className='wrapper'>
        <header>

          <img src="./hero.png" alt="herobanner" />
          <h1>Find  <span className='text-gradient'>Movies</span> You Will Enjoy Without The Hassle</h1>
          {/*search component*/}
       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

      <section className='all-movies'>
          <h2 className='mt-20'>All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) =>(
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
      </section>

       
      </div>
    </main>
  )
}

export default App

