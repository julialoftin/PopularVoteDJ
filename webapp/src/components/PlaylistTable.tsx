import { useEffect, useState } from "react";
import GetSeveralTracksAudioFeatures from "../SpotifyAPICalls/GetSeveralTracksAudioFeatures";
import { TrackObject } from "./ChoosePlaylistForChart";
import { AudioFeatureObject } from "../SpotifyAPICalls/GetSeveralTracksAudioFeatures";

interface TrackProp {
  tracksOfSelectedPlaylist: TrackObject[];
}

const PlaylistTable: React.FC<TrackProp> = ({ tracksOfSelectedPlaylist }) => {
  const [audioFeaturesArr, setAudioFeaturesArr] = useState<
    AudioFeatureObject[]
  >([]);
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
      <h3>Click on a track to get recommendations!</h3>
      <table>
        <thead>
          <tr>
            <th>Track</th>
            <th>Artist</th>
            <th>Popularity</th>
            <th>Acousticness</th>
            <th>Danceability</th>
            <th>Energy</th>
            <th>Instrumentalness</th>
            <th>Key</th>
            <th>Liveness</th>
            <th>Loudness</th>
            <th>Modality</th>
            <th>Speechiness</th>
            <th>Valence</th>
            <th>Duration(ms)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tracksOfSelectedPlaylist.map((track) => {
            const matchingAudioFeature = audioFeaturesArr.find(
              (audioFeature) => audioFeature.id === track.id
            );
            return (
              <tr key={track.id}>
                <td>
                  <a href={`/track/${track.id}`}>{track.name}</a>
                </td>
                <td>{track.artists[0].name}</td>
                <td>{track.popularity}</td>
                <td>
                  {matchingAudioFeature
                    ? matchingAudioFeature.acousticness
                    : ""}
                </td>
                <td>
                  {matchingAudioFeature
                    ? matchingAudioFeature.danceability
                    : ""}
                </td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.energy : ""}
                </td>
                <td>
                  {matchingAudioFeature
                    ? matchingAudioFeature.instrumentalness
                    : ""}
                </td>
                <td>{matchingAudioFeature ? matchingAudioFeature.key : ""}</td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.liveness : ""}
                </td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.loudness : ""}
                </td>
                <td>{matchingAudioFeature ? matchingAudioFeature.mode : ""}</td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.speechiness : ""}
                </td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.valence : ""}
                </td>
                <td>
                  {matchingAudioFeature ? matchingAudioFeature.duration_ms : ""}
                </td>
                <td>
                  <a href={`/track-recommendations/${track.id}`}>
                    Recommendations
                  </a>
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
