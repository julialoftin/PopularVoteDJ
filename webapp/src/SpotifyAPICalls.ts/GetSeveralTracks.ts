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

// const GetSeveralTracks = (trackIdArr: string[]) => {
//   const chunkedTrackArr = [];
//   if (trackIdArr) {
//     const chunkSize = 99;
//     for (let i = 0; i < trackIdArr.length; i += chunkSize) {
//       const chunk = trackIdArr.slice(i, i + chunkSize);
//       chunkedTrackArr.push(chunk);
//     }
//     console.log(chunkedTrackArr);
//     const promises = chunkedTrackArr.map((chunkArr) =>
//       spotifyCall(chunkArr.toString())
//     );
//     console.log(promises);
//     return Promise.all(promises);
//   }
//   return Promise.resolve([]);
// };

const GetSeveralTracks = async (trackIdArr: string[]) => {
  const chunkedTrackArr = [];
  if (trackIdArr) {
    const chunkSize = 99;
    for (let i = 0; i < trackIdArr.length; i += chunkSize) {
      const chunk = trackIdArr.slice(i, i + chunkSize);
      chunkedTrackArr.push(chunk);
    }
    const promises = chunkedTrackArr.map((chunkArr) =>
      spotifyCall(chunkArr.toString())
    );
    const responses = await Promise.all(promises);
    const tracks: TrackObject[] = responses
      .map((response) => response.tracks)
      .flat(); // Flatten the array of tracks
    return tracks;
  }
  return [];
};

export default GetSeveralTracks;
