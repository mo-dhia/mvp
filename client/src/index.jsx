import './App.css';
import React, { useState, useEffect, useRef } from "react"
import ReactDOM from 'react-dom'
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const process = {
  env: {
    REACT_APP_MDB_API_KEY: "48586718f1619baec6911ced95941d83",
    REACT_APP_YT_API_KEY: "AIzaSyA_BMKA4UnmglylTDfQ_5lPs-89g4DAxrA"
  }
}

const ytkey2 = "AIzaSyBEtKh4Y5qdHUIX3jH7aSLOGb4R1x5osQo"
import Home from "./components/Home/Home.jsx"
import MovieDetails from './components/Details/MovieDetails.jsx';
import SerieDetails from './components/Details/SerieDetails.jsx';
import Browse from './components/Browse/Browse.jsx';
import Prefrences from './components/Prefrences/Prefrences.jsx';

function App() {
  const dataFetchedRef = useRef(false);
  const [tvS, setTvS] = useState(undefined)
  const [TvSData, setTvSData] = useState(undefined);
  const [user, setUser] = useState(null)
  // const [user, setUser] = useState({
  //   _id: "63db87a6620470c77820147e",
  //   name: "hello",
  //   passwor: "123"
  // })
  const [modal, setModal] = useState(false)

  const [movies, setMovies] = useState(undefined);
  const [moviesData, setMoviesData] = useState(undefined);
  const [yt, setYt] = useState(0)
  const [ytCamouflagePosition, setYtCamouflagePosition] = useState(0)
  const [subject, setSubject] = useState({ subject: "lorem" })
  let coin = 0
  console.log(subject)
  useEffect(() => {
    if (dataFetchedRef.current) return;
    const random = parseInt(Math.random() * 10)
    coin = 1;


    Promise.all([
      axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_MDB_API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_MDB_API_KEY}`),
    ]).then(r => {
      let title = ""
      if (coin) {
        title = r[1].data.results[0].name + " official trailer"
        setSubject(r[1].data.results[0])
      }
      else if (!coin) {
        title = r[0].data.results[0].original_title + " official trailer"
        setSubject(r[0].data.results[0])
      }

      axios
        .get(`https://youtube.googleapis.com/youtube/v3/search?key=${"AIzaSyCAvLgjLJQqWe-YXnon0FfujtmGIYzgMs8"}&maxResults=1&q=${title}`).then((e) => setYt(e.data.items[0].id.videoId))
      setMoviesData(r[0].data.results)
      setMovies({ counter: 8, data: r[0].data.results.slice(0, 8) })
      setTvSData(r[1].data.results)
      setTvS({ counter: 8, data: r[1].data.results.slice(0, 8) })

    })
    hideYtBorderAlgo()
    // dataFetchedRef.current = true;
  }, []);
  const hideYtBorderAlgo = (n = window.innerWidth) => {
    const x = 1629;
    const y = -12;
    setYtCamouflagePosition(((x - n) / 50) - y)
  }

  const trendingLeftArrow = () => {
    setMovies({
      data: moviesData.slice(0, 8),
      counter: 8
    })
  }
  const trendingRightArrow = () => {
    if (moviesData.length >= movies.counter + 8) {
      setMovies({
        counter: movies.counter + 8,
        data: moviesData.slice(movies.counter, movies.counter + 8)
      })
    } else {
      setMovies({
        counter: movies.length,
        data: moviesData.slice(moviesData.length - 8, moviesData.length)
      })


    }
  }

  const trendingLeftArrowSeries = () => {
    setTvS({
      data: TvSData.slice(0, 8),
      counter: 8
    })
  }
  const trendingRightArrowSeries = () => {
    console.log(tvS)
    if (TvSData.length >= tvS.counter + 8) {
      setTvS({
        counter: tvS.counter + 8,
        data: TvSData.slice(tvS.counter, tvS.counter + 8)
      })
    } else {
      setTvS({
        counter: tvS.length,
        data: TvSData.slice(TvSData.length - 8, TvSData.length)
      })


    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/client/dist/index.html" element={<Home
          yt={yt}
          subject={subject}
          movies={movies} trendingLeftArrow={trendingLeftArrow} trendingRightArrow={trendingRightArrow}
          tvS={tvS} trendingLeftArrowSeries={trendingLeftArrowSeries} trendingRightArrowSeries={trendingRightArrowSeries}
          ytCamouflagePosition={ytCamouflagePosition} setUser={setUser} user={user} modal={modal} setModal={setModal} />} />
        <Route exact path="/client/dist/index.html/movie/:id" element={<MovieDetails setUser={setUser} user={user} modal={modal} setModal={setModal} />} />
        {/* <Route exact path="/client/dist/index.html" element={<Prefrences setUser={setUser} user={user} modal={modal} setModal={setModal} />} /> */}
        <Route exact path="/client/dist/index.html/serie/:id" element={<SerieDetails etUser={setUser} user={user} modal={modal} setModal={setModal} />} />
        <Route exact path="/client/dist/index.html/browse" element={<Browse />} />
        <Route exact path="/client/dist/index.html/prefrences" element={<Prefrences setUser={setUser} user={user} modal={modal} setModal={setModal} />} />

      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('app'))


