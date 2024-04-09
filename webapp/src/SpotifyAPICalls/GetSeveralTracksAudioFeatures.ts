export interface AudioFeatureObject {
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  valence: number;
}

const spotifyCall = async (trackIds: string) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
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
    return data;
  } catch (error) {
    console.error("Error fetching track: ", error);
  }
};

const GetSeveralTracksAudioFeatures = async (trackIdArr: string[]) => {
  try {
    const chunkedTrackArr = [];
    if (trackIdArr) {
      const chunkSize = 50;
      for (let i = 0; i < trackIdArr.length; i += chunkSize) {
        const chunk = trackIdArr.slice(i, i + chunkSize);
        chunkedTrackArr.push(chunk);
      }
      const promises = chunkedTrackArr.map((chunkArr) =>
        spotifyCall(chunkArr.toString())
      );
      const responses = await Promise.all(promises);
      const audioFeatures: AudioFeatureObject[] = responses
        .flatMap((response) => response.audio_features)
        .filter(
          (audio_features) =>
            audio_features !== null && audio_features !== undefined
        ); // Filter out null or undefined tracks
      return audioFeatures;
    }
    return [];
  } catch (error) {
    console.error("Error in GetSeveralTracksAudioFeatures: ", error);
    throw error; // Rethrow the error to propagate it
  }
};

export default GetSeveralTracksAudioFeatures;
