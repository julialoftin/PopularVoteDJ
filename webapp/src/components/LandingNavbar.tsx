import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <div>
      <Link to="/authorize">
        <button>Log in with Spotify!</button>
      </Link>
    </div>
  );
}
