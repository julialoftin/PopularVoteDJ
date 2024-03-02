import { Link } from "react-router-dom"

export default function Navbar() {

    return (
        <>
            <Link to='/authorize'><button>Log in With Spotify!</button></Link>
        </>
    )
}