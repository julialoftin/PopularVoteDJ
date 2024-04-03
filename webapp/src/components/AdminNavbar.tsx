export default function AdminNavbar() {
  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    window.location.href = "http://localhost:8080/admin/";
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
