import { useEffect, useRef, useState } from "react";

import NavBar from "./components/Navbar";
import NumResult from "./components/NumResults";
import Search from "./components/Search";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";



const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function MovieList({ movies, onSelectMovie }) {

  return (
    <ul className="list list-movies">
      {movies?.map((movie, i) => (
        <Movie key={i} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({ selectedId, onCloseMove, onAddWatched, watched }) {

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched =  watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating =  watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const countRef = useRef(0);


  useEffect(() => {
    
    countRef.current  =  countRef.current + 1;
  },[userRating])

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;


  // Reach hooks rulues 

  // inti state condinally would get an error 
    // if(imdbRating > 8) [isTop,setIsTop] = useState(true);

  // early return jsx note : must run after all hooks to avoid error 
    //if(imdbRating > 8) return <p>Greatest ever</p>




// =========================================================================================================

  // more details of useState

  // const [isTop,setIsTop] = useState(imdbRating > 8); 
  // // on re render the this imdbRating > 8 won't executed .... so always false
  // console.log(isTop);

  // // to fix above use useEffect

  // useEffect(() => {
  //   setIsTop(imdbRating > 8)
  // },[imdbRating]);

  // real fix is to use the derived state 

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  const [avg,setAvg] = useState(0)

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(' ').at(0),
      userRating
    }

    onAddWatched(newWatchedMovie);
    onCloseMove(null)

    // updating the state multiple times ...like as asynchronous .
    // setAvg(Number(imdbRating))
    //  //alert(avg) //  we can't get right awy the updated state value  
    // setAvg((curent) => {
    //  console.log(curent);
    //  console.log(imdbRating)
    //   return  ((curent + Nummer(imdbRating)) / 2)
    // }) 



    // fix is using call back function 
  }

  // one effect for one perfose

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`);
      const data = await response.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails()
  },
    [selectedId])

  
    // useEffect(() =>{
    //   if(!title) return
    //   document.title = `Movie | ${title}`

    //   return () => {
    //     document.title ='usePopCorn';
    //   }

    // },[title])

    // useEffect(() =>{

    //   const handleCallBack = (e) =>{
    //     if(e.code === 'Escape' ){
    //       onCloseMove();
    //     }
    // }

    //   document.addEventListener('keydown' ,handleCallBack)
    //   return () =>{
    //     document.removeEventListener('keydown',handleCallBack)
    //   }
    // },[])

    useEffect(() =>{
      if(!title) return
      document.title = `Movie | ${title}`
  
      return () => {
        document.title ='usePopCorn';
      }
  
    },[title])

    useKey('Escape',onCloseMove)

  return (


    <div className="details">

      {isLoading ? <Loader /> :

        <>
          <header>
            <button type="button" className="btn-back" onClick={onCloseMove}> &larr;</button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span> ⭐️</span>{imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            {avg}
            
            <div className="rating">
            {
              !isWatched ? <>
               <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 && <button type="button" className="btn-add" onClick={handleAdd}>+ Add to list</button>}
              </> : <p>You rated with Movie {watchedUserRating} ⭐️</p>
            }
             
            </div>

            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }

    </div>
  )
}

function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && (
        children
      )}
    </div>
  )
}

function Box({ children }) {
  // passing elements as props
  // alternative to children props

  const [isOpen, setIsOpen] = useState(true);

  // return (
  //   <div className="box">
  //     <button
  //       className="btn-toggle"
  //       onClick={() => setIsOpen((open) => !open)}
  //     >
  //       {isOpen ? "–" : "+"}
  //     </button>

  //     {isOpen && (
  //       el
  //     )}
  //   </div>
  // )


  // with children property  
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && (
        children
      )}
    </div>
  )
}


function WatchedSummary({ watched }) {

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>

  )
}


function WatchedMovie({ movie,onDeleteWatched }) {
  return (
    <li >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <button type="button" className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}


function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  )
}


// function WatchedBox() {

//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />

//         </>
//       )}
//     </div>
//   )
// }


function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}


function Loader() {
  return (<p>Loading...!</p>)
}

function ErrorMessage({ message }) {

  return (<p className="error">
    <span>⛔️</span>{message}
  </p>)
}

const API_KEY = "390d35c6";




export default function App() {

  // const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("")
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState('')
  // const [watched, setWatched] = useState(function () {
  //   // don't run on sub sequesnt render only on mount 
  //  const data = localStorage.getItem('watchedMovies');
  //  return JSON.parse(data);
  // });

  const [watched, setWatched] = useLocalStorageState([],"watchedMovies")

  const { movies,isLoading,error} = useMovies(query)
  
  // const isaddedTolist = watched.filter((movie) => movie.)

  // after browser paint
  // useEffect(()=>{
  //   console.log("After initial render")
  // },[])

  // useEffect(()=>{
  //   console.log("After every render")
  // });

  // useEffect(()=>{
  //   console.log("D")
  // },[query]);

  // console.log("During render")


  const handleSelectedMovie = (id) => {
    setSelectedId(selectedId => selectedId === id ? null : id)
  }

  function handleCloseMovie () {
    setSelectedId("")
  }

  const handleAddWatch = (movie) => {
    setWatched(watched => [...watched, movie]);
    // localStorage.setItem('watchedMovies',JSON.stringify([...watched, movie]));
  }

  const handleDeletedWatched = (id) => {
    setWatched(watched => [...watched].filter(movie => movie.imdbID !== id))
  }


  // useEffect(() => {
  //   localStorage.setItem('watchedMovies',JSON.stringify(watched));
  // },[watched]);




  // useEffect(() => {

  //   const controller = new AbortController();

  //   const fetchMoviesData = async () => {


  //     try {
  //       setIsLoading(true);
  //       setError("")
  //       const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,{signal:controller.signal});

  //       if (!response.ok) {
  //         throw new Error('Something went wrong while fetching movies...!')
  //       }
  //       const moviesData = await response.json();

  //       if (moviesData.Response === 'False')
  //         throw new Error('Movie not found')

  //       setMovies(moviesData.Search);
  //       setError("")
  //     } catch (error) {
  //       console.log(error)

  //       if(error.name !=='AbortError'){
  //         setError(error.message)
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //     // console.log(movies);  // remainder concept 
  //   }

  //   if (query.length < 2) {
  //     setMovies([]);
  //     setError("")
  //     return
  //   }

  //   handleCloseMovie()
  //   fetchMoviesData()

  //   return () =>{
  //     controller.abort();
  //   }
  // }, [/*defendency array examples state and props*/  query])


  return (
    <>
      <NavBar >
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>

        {/* alternative to children props */}
        {/* <Box el={<MovieList  movies={movies}></MovieList>} />
          
    
          <Box el={<>
            <WatchedSummary watched={watched} /><WatchedMovieList watched={watched} />
          </>} /> */}


        <Box>

          {/* {isLoading ? <Loader /> : <MovieList  movies={movies}></MovieList>} */}

          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie}></MovieList>}
          {error && <ErrorMessage message={error} />}

        </Box>
        <Box>
          {
            selectedId ? <MovieDetails watched={watched} selectedId={selectedId} onCloseMove={handleCloseMovie} onAddWatched={handleAddWatch} w /> : <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} onDeleteWatched={handleDeletedWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}




// early return get an error
// using in conditinal would get any error