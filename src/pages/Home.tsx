import { Link } from "react-router-dom"

export default function Home () {


    return (
        <>
            <h1>PopularVoteDJ</h1>
            <Link to='/authorize'><button>Log in With Spotify!</button></Link>
        </>
    )
}