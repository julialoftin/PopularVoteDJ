export default function AdminNavbar() {
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("codeVerifier");
    sessionStorage.removeItem("userId");
    window.location.href = "http://localhost:8080/";
  };

  return (
    <>
      <a href="/admin">Home</a>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
