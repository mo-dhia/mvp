import React from 'react'
import Header from "./Header/Header.jsx"
import YT from "./YT/YT.jsx"
import Trending from "./Categories/Trending/Trending.jsx"
export default function Home({
    yt, ytCamouflagePosition, movies, trendingLeftArrow, trendingRightArrow,
    tvS, trendingLeftArrowSeries, trendingRightArrowSeries, subject,
    setUser, user, setModal, modal }) {
    return (
        <div>
            <Header setUser={setUser} user={user} modal={modal} setModal={setModal} />
            <YT yt={yt} ytCamouflagePosition={ytCamouflagePosition} subject={subject} />
            <div style={
                {
                    height: `35.8vw`,
                }
            }></div>
            <Trending movies={movies} trendingLeftArrow={trendingLeftArrow} trendingRightArrow={trendingRightArrow}
                tvS={tvS} trendingLeftArrowSeries={trendingLeftArrowSeries} trendingRightArrowSeries={trendingRightArrowSeries} />
        </div>
    )
}
