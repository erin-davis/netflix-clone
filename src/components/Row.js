import React, {useState, useEffect} from 'react';
import axios from "../axios";
import "../styles/Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const req = await axios.get(fetchUrl)
      // console.log("this is the response req", req.data.results)
      setMovies(req.data.results);
      return req;
    }
    fetchData()
  }, [fetchUrl]);

  // console.log("these are movies", movies)
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
          />
        ))}
      </div>
    </div>
  );
}

export default Row;