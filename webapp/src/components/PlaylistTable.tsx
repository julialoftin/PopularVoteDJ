import { useEffect, useState } from "react";
import GetSeveralTracksAudioFeatures from "../SpotifyAPICalls/GetSeveralTracksAudioFeatures";
import { TrackObject } from "./ChoosePlaylistForChart";
import { AudioFeatureObject } from "../SpotifyAPICalls/GetSeveralTracksAudioFeatures";

interface TrackProp {
  tracksOfSelectedPlaylist: TrackObject[];
}

const PlaylistTable: React.FC<TrackProp> = ({ tracksOfSelectedPlaylist }) => {
  const [audioFeaturesArr, setAudioFeaturesArr] = useState<AudioFeatureObject[]>([]);
  console.log("tracksOfSelectedPlaylist: ", tracksOfSelectedPlaylist);

  useEffect(() => {

    if (tracksOfSelectedPlaylist && tracksOfSelectedPlaylist.length > 0) {
      const trackIds = tracksOfSelectedPlaylist.map((track) => track.id);
      GetSeveralTracksAudioFeatures(trackIds)
        .then((audioFeatures) => {
          setAudioFeaturesArr(audioFeatures); // Assuming audio_features is an array in the response
          console.log("All audioFeatures fetched:", audioFeaturesArr);
        })
        .catch((error) => {
          console.error("Error fetching audio features:", error);
        });
    }

  }, [tracksOfSelectedPlaylist]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Track</th>
            <th>Artist</th>
            <th>Popularity</th>
            <th>Acousticness</th>
          </tr>
        </thead>
        <tbody>
          {tracksOfSelectedPlaylist.map((track) => {
            const matchingAudioFeature = audioFeaturesArr.find(
              (audioFeature) => audioFeature.id === track.id
            );
            return (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td>{track.popularity}</td>
                <td>
                  {matchingAudioFeature
                    ? matchingAudioFeature.acousticness
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistTable;
