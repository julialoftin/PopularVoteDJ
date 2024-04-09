import { TrackObject } from "../components/ChoosePlaylistForChart";

const spotifyCall = async (trackIds: string) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${trackIds}`,
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

const GetSeveralTracks = async (trackIdArr: string[]) => {
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
      const tracks: TrackObject[] = responses
        .flatMap((response) => response.tracks)
        .filter((track) => track !== null && track !== undefined); // Filter out null or undefined tracks
      return tracks;
    }
    return [];
  } catch (error) {
    console.error("Error in GetSeveralTracks: ", error);
    throw error; // Rethrow the error to propagate it
  }
};

export default GetSeveralTracks;
