import { useEffect } from "react";
import "../styles/Admin.css"

export default function Redirect() {
  async function getToken() {
    const codeVerifier = localStorage.getItem("codeVerifier");
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const redirectURI = "http://localhost:8080/redirect";

    if (codeVerifier != null && code != null) {
      const payload = new URLSearchParams({
        client_id: clientID,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectURI,
        code_verifier: codeVerifier,
      });

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload,
          credentials: "include",
        });

        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        window.localStorage.setItem("access_token", data["access_token"]);
        window.localStorage.setItem("refresh_token", data["refresh_token"]);
        await new Promise<void>((resolve) => resolve());
      } catch (error) {
        console.error("Error during token retrieval:", error);
      }
    } else {
      console.log("Code verifier or code not found");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getToken();
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (localStorage.getItem("codeVerifier") && code != null) {
        window.location.href = "http://localhost:8080/admin/";
      }
    };
    fetchData();
  }, []);

  return null;
}