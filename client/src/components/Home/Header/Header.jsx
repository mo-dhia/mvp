import React, { useState, useEffect } from "react"
import "./Header.css";
import {
  Link
} from "react-router-dom";
import axios from "axios";
function App({ user, setUser, modal, setModal }) {
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    axios.get("http://localhost:3000/user", { headers: { name: name, password: password } })
      .then((e) => {
        if (Array.isArray(e.data)) {
          console.log(e.data[0])
          setUser(e.data[0])
          setModal(false)
        } else {
          setError(e.data)
        }
      })
  }
  return (
    <div >
      <header>
        <ul>
          <li className="home" >
            <Link style={{ color: "#8a8a8a", textDecoration: "none" }}
              to="/client/dist/index.html">HOME</Link>
          </li>
          <li>
            <Link style={{ color: "#8a8a8a", textDecoration: "none" }}
              to="/client/dist/index.html/prefrences">MY STUFF</Link>
          </li>
          <li >
            <Link style={{ color: "#8a8a8a", textDecoration: "none" }}
              to="/client/dist/index.html/browse">BROWSE</Link>
          </li>

        </ul>

        <ul>
          <li>
            <span onClick={() => {
              console.log(modal)
              if (!user) {
                setModal(!modal)
              } else {
                setEditModal(!editModal)
              }
            }} style={{
              position: "relative", top: "-40px", right: '20%', color: "#8a8a8a", fontFamily: "helvetica",
              fontSize: "22px",
              cursor: "pointer", textDecoration: "underline"
            }}>{user ? user.name : "Log in"}</span>
            <img src="https://download.logo.wine/logo/Hulu/Hulu-Logo.wine.png"
              style={{ width: "150px", marginRight: "80px" }}
            />
          </li>
        </ul>
      </header>
      {modal ? <div style={{
        position: "absolute",
        background: "rgba(32, 31, 31, 0.78)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(32, 31, 31, 0.3)",
        width: "25vw",
        height: "70vh",
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
        textAlign: "center",
        color: "white",
        zIndex: "9999999999999"
      }}>
        <div onClick={() => setModal(false)} style={{ position: "absolute", right: "15px", top: "5px",
         cursor: "pointer" }}> x</div>
        <h2 style={{ marginTop: "60px" }}> name </h2>
        <input value={name} onChange={(e) => setName(e.target.value)}
          style={{ width: "200px", height: "50px", borderRadius: "5px", fontSize: "20px", textAlign: "center" }} />
        <h2 style={{ marginTop: "60px" }}> password </h2>
        <input onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleLogin()
          }
        }}
          value={password} onChange={(e) => setPassword(e.target.value)} type="password"
          style={{ width: "200px", height: "50px", borderRadius: "5px", fontSize: "20px", textAlign: "center" }} />
        <h2

          onClick={() => {
            handleLogin()
          }}


          style={{ textDecoration: "underline", marginTop: "100px", cursor: "pointer" }}>login</h2>
        <h2

          onClick={() => {
            axios.post('http://localhost:3000/user', null, {
              headers: { name: name, password: password }
            })
              .then((e) => {
                if (typeof e.data !== "string") {
                  setModal(false)
                } else {
                  setError(e.data)
                }
              })
          }}

          style={{ textDecoration: "underline", cursor: "pointer" }}>sign up</h2>

        <div style={{ color: "red" }}>{error ? error : null} </div>
      </div> : null}



      {editModal ? <div style={{
        position: "absolute",
        background: "rgba(32, 31, 31, 0.78)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(32, 31, 31, 0.3)",
        width: "25vw",
        height: "70vh",
        transform: "translate(-50%, -50%)",
        left: "50%",
        top: "50%",
        textAlign: "center",
        color: "white"
      }}>
        <div onClick={() => setEditModal(false)} style={{ position: "absolute", right: "15px", top: "5px", cursor: "pointer" }}> x</div>
        <h2 style={{ marginTop: "60px" }}> name </h2>
        <input value={name} onChange={(e) => setName(e.target.value)}
          style={{ width: "200px", height: "50px", borderRadius: "5px", fontSize: "20px", textAlign: "center" }} />
        <h2 style={{ marginTop: "60px" }}> password </h2>
        <input
          value={password} onChange={(e) => setPassword(e.target.value)} type="password"

          style={{ width: "200px", height: "50px", borderRadius: "5px", fontSize: "20px", textAlign: "center" }} />
        <h2

          onClick={() => {
            let header = {
              password: password,
              id: user._id,
            }
            if (name !== user.name) { header.name = name }
            axios.patch('http://localhost:3000/user', null, {
              headers: header
            })
              .then((e) => {
                console.log(e)
                if (typeof e.data !== "string") {
                  if (!header.name) { header.name = name }
                  setUser(header)
                  console.log(e.data)
                  setError("update succeeded")
                } else {
                  setError(e.data)
                }
              })
          }}
          style={{ textDecoration: "underline", marginTop: "100px", cursor: "pointer" }}>Update</h2>

        <div style={error === "update succeeded" ? { color: "green" } :
          { color: "red" }}>{error ? error : null} </div>
      </div> : null}





    </div>
  );
}

export default App;
