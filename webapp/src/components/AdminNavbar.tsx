import { Link } from "react-router-dom";

export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/authorize">
          <button>Log in With Spotify!</button>
        </Link>
    </>
  );
}
