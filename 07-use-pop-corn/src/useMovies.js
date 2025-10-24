import {  useEffect, useState } from "react";

const API_KEY = "390d35c6";

export function useMovies(query)  {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("")

    useEffect(() => {

        const controller = new AbortController();

        const fetchMoviesData = async () => {
    
          try {
            setIsLoading(true);
            setError("")
            const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,{signal:controller.signal});
    
            if (!response.ok) {
              throw new Error('Something went wrong while fetching movies...!')
            }
            const moviesData = await response.json();
    
            if (moviesData.Response === 'False')
              throw new Error('Movie not found')
    
            setMovies(moviesData.Search);
            setError("")
          } catch (error) {
            console.log(error)
    
            if(error.name !=='AbortError'){
              setError(error.message)
            }
          } finally {
            setIsLoading(false);
          }
          // console.log(movies);  // remainder concept 
        }
    
        if (query.length < 2) {
          setMovies([]);
          setError("")
          return
        }
      
        fetchMoviesData()
    
        return () =>{
          controller.abort();
        }
      }, [/*defendency array examples state and props*/  query])
    
      return {
        movies,isLoading,error
      }
}

