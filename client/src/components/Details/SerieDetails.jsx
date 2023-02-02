import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from "../Home/Header/Header.jsx"
export default function SerieDetails() {
    const [serie, setSerie] = useState(null)
    const [library, setLibrary] = useState("Add to Library")

    useEffect(() => {
        console.log(serie)
        const id = window.location.pathname.slice(window.location.pathname.indexOf('serie') + 6);

        Promise.all([
            axios
                .get(`https://api.themoviedb.org/3/tv/${id}?api_key=48586718f1619baec6911ced95941d83&language=en-US`),
            axios.get('http://localhost:3000/api/prefrences', { headers: { userid: "63d990820fe24fd82361077b" } })
        ]).then((r) => {
            console.log(r[0].data)
            r[1].data.forEach((element, index) => {
                if (element?.length) {
                    element.forEach(e => {
                        if (e._id == r[0].data.id && index === 0) {
                            setLibrary("Planned")
                        }
                        else if (e._id == r[0].data.id && index === 1) {
                            setLibrary("Already Watched")
                        }
                    });
                }
            });
            setSerie(r[0].data)
        }).catch((err) => console.log(err))
    }, [])

    const handleLibrary = () => {
        const handleAxios = (param) => {
            let item = {
                name: serie.original_name,
                imgUrl: "https://image.tmdb.org/t/p/original" + serie.poster_path,
                overview: serie.overview,
                genres: serie.genres,
                rating: serie.vote_average
            }
            let body = {}
            body[param] = {
                type: "serie",
                item: item,
                _id: serie.id
            }
            return axios.post("http://localhost:3000/api/prefrences", body,
                {
                    headers:
                        { userid: "63d990820fe24fd82361077b" }
                });
        }
        if (library === 'Add to Library') {
            handleAxios("toWatch").then(() => setLibrary("Planned"))
        } else if (library === 'Planned') {
            handleAxios("watched").then(() => setLibrary("Already Watched"))
        } else {
            alert("Already Watched find something else to watch")
        }
    }

    return (
        <div>
            <Header />
            <div style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundImage: ` url(https://image.tmdb.org/t/p/original${serie && serie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}>
                <div style={{ marginLeft: "50px" }}>
                    <div style={{ width: "50%", float: "left" }}>
                        <h1 id="title" style={{
                            position: "relative",
                            zIndex: 1,
                            top: "60px"
                        }}>
                            {serie && serie.name}
                        </h1>
                        <div style={{
                            position: "relative", top: "60px", zIndex: 1,
                        }}>
                            <button style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(5px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                width: "130px",
                                height: "60px", cursor: "pointer",
                                color: "white", textShadow: "2px 2px 2px #201f1f",
                            }}
                                onClick={() => {

                                    axios
                                    axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=${"AIzaSyCAvLgjLJQqWe-YXnon0FfujtmGIYzgMs8"}&maxResults=1&q=${serie.original_name}`)
                                        .then((e) => window.open(`https://www.youtube.com/watch?v=${e.data.items[0].id.videoId}`, '_blank') )
                                }}>Watch Trailer</button>
                            <button style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                backdropFilter: "blur(5px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                width: "130px",
                                height: "60px",
                                color: "white", textShadow: "2px 2px 2px #201f1f",
                                marginLeft: '30px', cursor: "pointer",
                            }}
                                onClick={() => handleLibrary()}>{library}</button>
                        </div>


                        <div style={{
                            color: "white", fontSize: "25px",
                            position: "relative", top: "300px", zIndex: "5"
                        }}>
                            <span>{serie && serie.episode_run_time[0]} min</span>
                            <span style={{ marginLeft: "50px" }}>{serie && serie.last_air_date.slice(0, 4)}</span>
                            <span style={{ marginLeft: "50px" }}>
                                {serie && serie.vote_average.toString().slice(0, 3)}
                                <img style={{ width: "40px", position: "relative", top: "10px" }}
                                    src='https://cdn.discordapp.com/attachments/1010012975253422103/1070434900953550920/pngwing.com.png' />

                            </span>
                        </div>

                        <div style={{
                            color: "white", fontSize: "20px",
                            position: "relative", top: "320px", zIndex: "5"
                        }}>
                            {serie && serie.genres.map((e, i) => {
                                if (i === 0) {
                                    return <span key={i}> {e.name + " "}&nbsp;{" |"}</span>
                                }
                                else if (i === serie.genres.length - 1) {
                                    return <span key={i} style={{ marginLeft: "30px" }}>{e.name}</span>
                                }
                                else {
                                    return <span key={i} style={{ marginLeft: "30px" }}>{e.name + " |"}</span>
                                }
                            })}
                        </div>

                        <div style={{
                            color: "gray", fontSize: "25px",
                            position: "relative", top: "380px", zIndex: "5"
                        }}>
                            Languages
                            <div>
                                {serie && serie.spoken_languages.map((e, i) => {
                                    if (i === 0) {
                                        return <span key={i}> {e.english_name + " "}&nbsp;
                                            {serie.spoken_languages.length > 1 ?
                                                " |" : null}</span>
                                    }
                                    else if (i === serie.genres.length - 1) {
                                        return <span key={i} style={{ marginLeft: "30px" }}>{e.english_name}</span>
                                    }
                                    else {
                                        return <span key={i} style={{ marginLeft: "30px" }}>{e.english_name + " |"}</span>
                                    }
                                })}
                            </div>
                        </div>


                        <div style={{
                            color: "gray", fontSize: "20px",
                            position: "relative", top: "420px", zIndex: "5"
                        }}>
                            Producers
                            <div>
                                {serie && serie.networks.map((e, i) => {
                                    if (i === 0) {
                                        return <span key={i}> {e.name + " "}&nbsp;
                                            {serie.name > 1 ?
                                                " |" : null}</span>
                                    }
                                    else if (i === serie.genres.length - 1) {
                                        return <span key={i} style={{ marginLeft: "30px" }}>{e.name}</span>
                                    }
                                    else {
                                        return <span key={i} style={{ marginLeft: "30px" }}>{e.name + " |"}</span>
                                    }
                                })}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div style={{
                            color: "white", top: "150px", fontSize: "30px",
                            position: 'relative', zIndex: "5", height: "100vh",
                            width: "30%", float: 'right', top: "0",
                            background: "linear-gradient(to left, rgba(32, 31, 31, 0.7), #201f1f)"

                        }}>
                            <h1 style={{ textAlign: "center" }}>{serie && serie.tagline}</h1>
                            <div style={{ width: "80%", marginLeft: "10%" }}>
                                {serie && serie.overview}
                            </div>
                            <div style={{ textAlign: "center", position: "relative", top: "100px", textDecoration: "underline" }}>
                                <a style={{ color: "white" }} href={serie && serie.homepage}>start watching</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0))"
                }} />


            </div>
        </div>
    )
}
