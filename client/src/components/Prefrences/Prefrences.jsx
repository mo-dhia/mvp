import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Home/Header/Header.jsx'
import { Link } from 'react-router-dom'
export default function Prefrences({ setUser, user, setModal, modal }) {
    const [watched, setWatched] = useState([])
    const [toWatch, setToWatch] = useState([])
    useEffect(() => {

        getData()
    }, [])

    const getData = () => {
        if (user) {
            axios.get("http://localhost:3000/api/prefrences",
                { headers: { userid: user._id } }).then((e) => {
                    setToWatch(e.data[0])
                    setWatched(e.data[1])
                })
        }
    }
    console.log(watched[0])
    return (
        <div >
            <Header setUser={setUser} user={user} modal={modal} setModal={setModal} />
            <div style={{ marginTop: "50px", marginLeft: "5vw" }}>
                <h1 id="title">My List</h1>
                <h2 style={{ color: "white" }}>Plans</h2>
                {toWatch.map((e) => {
                    return <Link to={`/client/dist/index.html/${e.type}/${e._id}`} style={{
                        marginLeft: '30px',
                        width: "200px",
                        height: "300px",
                        backgroundImage: `url(${e.item.imgUrl})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        borderRadius: '10px',
                        display: "inline-block",
                        cursor: "pointer",
                        textDecoration: "none",
                        color: "red",
                        fontSize: "24px"
                    }}><div onClick={(event) => {
                        event.preventDefault()
                        axios.delete('http://localhost:3000/api/prefrences', {
                            data: {
                                userid: user._id, id: e._id
                            }
                        }).then(() => getData()).catch((err) => console.log(err))
                    }} style={{ position: "relative", top: "0", float: "right", right: "5px", zIndex: "50" }}>X</div></Link>
                })}
                <br />
                <h2>Watched</h2>
                <div style={{ marginTop: "30px" }}>
                    {watched.map((e) => {
                        return <Link  to={`/client/dist/index.html/${e.type}/${e._id}`} style={{
                            marginLeft: '30px',
                            width: "200px",
                            height: "300px",
                            backgroundImage: `url(${e.item.imgUrl})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            borderRadius: '10px',
                            display: "inline-block",
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "red",
                            fontSize: "24px"
                        }}><div onClick={(event) => {
                            event.preventDefault()
                            axios.delete('http://localhost:3000/api/prefrences', {
                                data: {
                                    userid: user._id, type: "watched", id: e._id
                                }
                            }).then(() => getData()).catch((err) => console.log(err))
                        }} style={{ position: "relative", top: "0", float: "right", right: "5px", zIndex: "50" }}>X</div></Link>
                    })}
                </div>
            </div>
        </div>
    )
}
