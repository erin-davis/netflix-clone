import React, {useState, useEffect} from 'react';
import axios from "../axios";
import requests from "../requests";
import "../styles/Banner.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const req = await axios.get(requests.fetchNetflixOriginals);

      setMovie(req.data.results[Math.floor(Math.random() * req.data.results.length -1)]);
      return req;
    }
    fetchData();
  }, []);
  
  //console.log("from banner here is movie", movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          ${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    > 
      <div className="banner__contents">
      <h1 className="banner__title">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
        <div className="banner__buttons">
          <button className="banner__btn">Play</button>
          <button className="banner__btn">My List</button>
        </div>
      <h2 className="banner__description">{truncate(movie?.overview, 200)}</h2>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  )
}

export default Banner
