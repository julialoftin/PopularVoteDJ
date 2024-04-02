import { Link } from "react-router-dom";

// interface props {
//   setIsUserAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
//   isUserAuthenticated: boolean | null;
// }

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
