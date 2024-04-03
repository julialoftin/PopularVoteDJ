
export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "http://localhost:8080/admin/";
  };

  return (
    <>
        <button onClick={handleLogout}>Logout</button>
    </>
  );
}
