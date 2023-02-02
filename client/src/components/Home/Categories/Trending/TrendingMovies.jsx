

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function TrendingMovies({ movies, trendingLeftArrow, trendingRightArrow }) {
    const [imgHover, setImgHover] = useState(null)
    const [leftHover, setLeftHover] = useState(null)
    const [rightHover, setRightHover] = useState(null)
    return (
        <div id="trendingMovies" style={{
            width: "90%", paddingBottom: "80px", position: "relative",
            display: "flex", alignItems: "center", left: "5%"
        }}>
            {movies && movies.counter - 8 !== 0 ?
                <div onClick={() => trendingLeftArrow()} style={Object.assign({
                    width: "100px", height: '300px',
                    position: "absolute",
                    color: "white",
                    fontSize: "75px",
                    left: "-10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }, leftHover ? { background: "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,90))" }
                    : {})}> <div onMouseEnter={() => setLeftHover(true)} onMouseLeave={() => setLeftHover(false)}
                        style={{ position: "relative", top: "90px" }}>{"<"} </div></div> : null
            }
            {movies && movies.data.map((e, i) => {
                var imgSrc = "https://image.tmdb.org/t/p/original" + e.backdrop_path
                return (
                    <Link

                        to={`/client/dist/index.html/movie/` + movies.data[i].id}
                        key={i}
                        onMouseEnter={() => { setImgHover(i) }}
                        onMouseLeave={() => { setImgHover(null) }}
                        style={
                            Object.assign(
                                {
                                    width: "350px",
                                    height: "300px",
                                    marginLeft: "30px",
                                    cursor: "pointer",
                                    transition: "all .2s ease-in-out",
                                    backgroundImage: `url(${imgSrc})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    borderRadius: '10px'
                                },
                                imgHover === i ? { transform: "scale(1.3)" } : {}
                            )
                        }
                    >
                        {imgHover === i ?
                            <div id="imhere" style={{
                                backgroundColor: "red", position: "absolute", height: "100%",
                                width: "100%",
                                background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",

                                backgroundSize: "cover",
                                boxShadow: "0px 10px 20px rgba(0,0,0,0.5)",

                            }}>
                                <div style={{ position: "absolute", top: "5px", left: "5px" }}>
                                    <div style={{
                                        width: "24px", height: "27px",
                                        borderRadius: "5px", display: "flex"
                                    }}>
                                        <img style={{ width: "100%" }}
                                            src={"https://cdn.discordapp.com/attachments/1010012975253422103/1070249940565102662/time.png"} />
                                        <img style={{ width: "100%", marginLeft: '10px' }}
                                            src={"https://cdn.discordapp.com/attachments/1010012975253422103/1070249940787404841/check_1.png"} />
                                    </div>
                                </div>
                                <div style={{ position: "absolute", bottom: "0" }}>
                                    <h2 style={{
                                        textAlign: "center", color: "white", textShadow: "2px 2px 2px #201f1f",

                                    }}>
                                        {e.title}
                                    </h2>
                                    <div style={{ color: "white", textAlign: "center" }}>
                                        {e.overview.length > 100 ? e.overview.slice(0, 100) + " ..." : null}
                                    </div>
                                </div>
                            </div> : null}

                    </Link>
                )
            })}
            {movies && movies.counter < 21 ?
                < div onClick={() => trendingRightArrow()} style={Object.assign({
                    width: "100px", height: '300px',
                    position: "absolute",
                    color: "white",
                    fontSize: "75px",
                    right: "-50px",
                    borderRadius: "5px",
                    cursor: "pointer"
                }, rightHover ? { background: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,90))" }
                    : {})}> <div onMouseEnter={() => setRightHover(true)} onMouseLeave={() => setRightHover(false)}
                        style={{ position: "relative", top: "90px", right: "-60px" }}>{">"} </div></div> : null
            }
        </div >
    )
}