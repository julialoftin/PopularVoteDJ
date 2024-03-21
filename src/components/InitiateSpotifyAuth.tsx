import { useEffect, useState } from "react";

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

export default function SpotifyAuth() {

  const clientID = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const redirectURI = "http://localhost:5173/admin";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!code) {
        await initiateSpotifyAuth();
      }
    };
    fetchData();
  }, []);

  return <></>;
}
