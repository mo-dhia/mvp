import React, { useState } from "react"
import TrendingMovies from "./TrendingMovies.jsx"
import TrendingSeries from "./TrendingSeries.jsx"
export default function Movies({
  movies, trendingLeftArrow, trendingRightArrow,
  tvS, trendingLeftArrowSeries, trendingRightArrowSeries }) {
  return (
    <div>
      <h1 style={{
        color: "hsl(158deg 99% 46%)", marginLeft: "15px",
        textShadow: " 4px 4px 3px rgba(0,0,0,0.6)",
      }}>
        Trending Now
      </h1>
      <TrendingMovies movies={movies} trendingLeftArrow={trendingLeftArrow} trendingRightArrow={trendingRightArrow} />
      <TrendingSeries tvS={tvS} trendingLeftArrowSeries={trendingLeftArrowSeries} trendingRightArrowSeries={trendingRightArrowSeries} />
    </div>
  )
}
