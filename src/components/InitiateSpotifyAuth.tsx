import { useEffect, useState } from "react";

interface props {
  isAccessToken: boolean | null;
  setIsAccessToken: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export default function SpotifyAuth({
  isAccessToken,
  setIsAccessToken,
}: props) {
  const clientID = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const redirectURI = "http://localhost:5173/";

  async function initiateSpotifyAuth() {
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
  }

  async function getToken() {
    const codeVerifier = localStorage.getItem("codeVerifier");

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
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        localStorage.setItem("access_token", data["access_token"]);
        if (localStorage.getItem("access_token")) {
            setIsAccessToken(true);
        }
        console.log(isAccessToken);
        console.log(localStorage.getItem("access_token"));
        localStorage.setItem("refresh_token", data["refresh_token"]);
      } catch (error) {
        console.error("Error during token retrieval:", error);
        setIsAccessToken(false);
      }
    } else {
      console.log("Code verifier or code not found");
      setIsAccessToken(false);
    }
  }

  useEffect(() => {
    if (!code) {
      initiateSpotifyAuth();
    } else {
      getToken();
    }
  }, [setIsAccessToken]);

  return <></>;
}
