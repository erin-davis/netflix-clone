import React, {useState, useEffect} from 'react';
import axios from "../axios";
import "../styles/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(()=>{
    async function fetchData(){
      const req = await axios.get(fetchUrl)
      // console.log("this is the response req", req.data.results)
      setMovies(req.data.results);
      return req;
    }
    fetchData()
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //i need to get the release date which is movie.release_date

  const handleClick = movie =>{
    if(trailerUrl){
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
      // && movie?.release_date
      .then(url =>{
          console.log('this is the release date', movie.release_date, movie.title, movie.name)
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
      })
      .catch(err => console.log('this is the error: ', err));
    }
  };

  console.log(movies)

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* several row__posters */}
        {movies.map((movie) =>(
          <img
          src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
          alt={movie.name}
          className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          key={movie.id}
          onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
//save trailer url `b6li05zh3Kg`