import "./YT.css"
import React from "react"
export default function YT({ yt, ytCamouflagePosition, subject }) {
    console.log(subject)
    return (
        <div style={{
            position: "absolute",
            marginTop: `-${ytCamouflagePosition + 2}vh`,
            height: "100vh",
            width: "100vw",
            zIndex: "-555555555"
        }}>
            <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${yt}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${yt}`}
                frameborder="0" />
            {/* <iframe id="ytVid"
                src={`https://www.youtube.com/embed/${"_Z3QKkl1WyM"}?rel=0?version=3&autoplay=1&controls=0&&showinfo=0&loop=1&mute=1&playlist=${"_Z3QKkl1WyM"}`}
                frameborder="0" /> */}
            <div style={{
                position: "absolute", width: "100vw", backgroundColor: "transparent", height: "100vh",
                zIndex: "-55"
            }}>

            </div>
            <div style={{ width: "30%", marginLeft: "40px" }}>
                <h1 id="title" style={{ position: "relative", top: "100px", textShadow: "2px 2px 2px #201f1f" }}>
                    {subject && (subject.name ? subject.name : subject.title)}
                </h1>
                <div style={{ color: "white", marginTop: "150px", fontSize: "30px", }}>
                    {subject && subject.overview + " ..."}
                </div>
            </div>
            <div
                style={{
                    boxShadow: "0px 200px 20px 0px #201f1f inset",
                    height: "252px",
                    position: "absolute",
                    width: "100vw",
                    left: "0",
                    bottom: `${ytCamouflagePosition - 12}vh`,
                    zIndex: "-5", transform: 'rotate(180deg)'
                }}>

            </div>
            <div style={{
                height: "90vh",
                width: "50vw",
                background: "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,90))",
                top: "0",
                position: "absolute",
                zIndex: "-50"
            }}>

            </div>

        </div>
    )

}
