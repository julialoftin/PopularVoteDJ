import { useEffect } from "react";

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.-~";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export default function SpotifyAuth() {
  useEffect(() => {
    const clientID = import.meta.env.VITE_CLIENT_ID;
    const redirectURI = "http://localhost:5173/admin";

    const initiateSpotifyAuth = async () => {
      const codeVerifier = generateRandomString(128);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);

      const scope = "playlist-modify-public";
      const authURL = new URL("https://accounts.spotify.com/authorize/");

      window.localStorage.setItem("codeVerifier", codeVerifier);

      const params = {
        response_type: "code",
        client_id: clientID,
        scope: scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectURI,
      };

      authURL.search = new URLSearchParams(params).toString();
      window.location.href = authURL.toString();
    };

    const getToken = async () => {
        const codeVerifier = localStorage.getItem("codeVerifier");
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
  
        if (codeVerifier != null && code != null) {
          const tokenURL = new URL("https://accounts.spotify.com/api/token/");
          const payload = new URLSearchParams({
            client_id: clientID,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectURI,
            codeVerifier: codeVerifier,
          });
          try {
            const response = await fetch(tokenURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: payload,
            });
  
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
  
            const data = await response.json();
            console.log("Token Request Payload:", payload);
            console.log("Token Response:", data);
  
            localStorage.setItem("accessToken", data.accessToken);
          } catch (error) {
            console.error("Error during token retrieval:", error);
          }
        } else {
          console.log("Code verifier or code not found");
        }
      };

    initiateSpotifyAuth();
    getToken();
}, []);
    return (<></>)
}