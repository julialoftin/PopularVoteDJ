import { Link } from "react-router-dom"

export default function Home () {


    return (
        <>
            <Link to='/authorize'><button>Log in With Spotify!</button></Link>
            <h1>PopularVoteDJ</h1>
        </>
    )
}