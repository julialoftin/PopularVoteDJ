import { useEffect, useState } from "react";
import GetCurrentUsersPlaylists from "../SpotifyAPICalls.ts/GetCurrentUsersPlaylists";
import GetPlaylistItems from "../SpotifyAPICalls.ts/GetPlaylistItems";
import GetTrack from "../SpotifyAPICalls.ts/GetTrack";
import PlaylistTable from "./PlaylistTable";
import GetSeveralTracks from "../SpotifyAPICalls.ts/GetSeveralTracks";

interface PlaylistData {
  id: string;
  name: string;
}

interface PlaylistItems {
  items: {
    track: {
      name: string;
      id: string;
      artists: [
        {
          id: string;
          name: string;
        }
      ];
    };
  }[];
}

export interface TrackObject {
  id: string;
  name: string;
  popularity: number;
  artists: [
    {
      id: string;
      name: string;
      genres: [string];
    }
  ];
  // other properties...
}

const ChoosePlaylistForChart = () => {
  const [playlistData, setPlaylistData] = useState<PlaylistData[]>([]);
  const [tracksOfSelectedPlaylist, setTracksOfSelectedPlaylist] = useState<
    TrackObject[]
  >([]);
  const getData = async () => {
    const data = await GetCurrentUsersPlaylists();
    setPlaylistData(data.items);
    console.log(playlistData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const playlistSelect = document.getElementById(
      "playlistSelect"
    ) as HTMLSelectElement;
    if (playlistSelect) {
      const selectedPlaylistId = playlistSelect.value; // ID from select tag
      const playlistItems: PlaylistItems = await GetPlaylistItems(
        selectedPlaylistId
      );
      if (playlistItems) {
        const trackIds = playlistItems.items.map((item) => item.track.id);
        console.log(trackIds);
        // const trackObjectsPromises = trackIds.map((trackId) =>
        //   GetTrack(trackId)
        // );
        // Promise.all(trackObjectsPromises)
        //   .then((trackObjectsArray) => {
        //     setTracksOfSelectedPlaylist(trackObjectsArray as TrackObject[]);
        //     console.log(trackObjectsArray);
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching track details:", error);
        //   });
        GetSeveralTracks(trackIds)
          .then((trackObjectsArray) => {
            console.log("All track objects fetched:", trackObjectsArray);
          })
          .catch((error) => {
            console.error("Error fetching track objects:", error);
          });
      } else {
        console.error("Track IDs not found");
      }
    } else {
      console.error("Playlist Select element not found");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Create your genre chart!</h3>
      <p>Choose a playlist and click submit to get started.</p>
      <form onSubmit={handleSubmit}>
        <select id="playlistSelect" required>
          <option value="">Select a Playlist</option>
          {playlistData.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Chart</button>
      </form>
      <PlaylistTable tracksOfSelectedPlaylist={tracksOfSelectedPlaylist} />
    </div>
  );
};

export default ChoosePlaylistForChart;
