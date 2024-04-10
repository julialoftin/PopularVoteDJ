import { AudioFeatureObject } from "./GetSeveralTracksAudioFeatures";

export interface AudioFeature {
    acousticness: number;
    danceability: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    valence: number;
  }

const GetTrackAudioFeatures = async (track_id: string) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features/${track_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const result: AudioFeatureObject = data;
      return result;
    } catch (error) {
      console.error("Error fetching audio features: ", error);
    }
  };
  
  export default GetTrackAudioFeatures;