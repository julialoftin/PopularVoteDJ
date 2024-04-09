import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TrackObject } from "../components/ChoosePlaylistForChart";
import GetTrack from "../SpotifyAPICalls/GetTrack";
import GetTrackRecommendations from "../SpotifyAPICalls/GetTrackRecommendation";
import AdminNavbar from "../components/AdminNavbar";

const TrackRecommendations = () => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState<TrackObject[]>([]);
  const [baseTrack, setBaseTrack] = useState<TrackObject>();

  useEffect(() => {
    if (id != undefined) {
      GetTrackRecommendations(id).then((recommendationResult) => {
        console.log(recommendationResult);
        setRecommendations(recommendationResult.tracks);
      });
      GetTrack(id).then((track) => {
        setBaseTrack(track);
      });
    }
  }, [id]);

  return (
    <div>
      <AdminNavbar />
      {baseTrack && (
        <h3 key={baseTrack.id}>Recommended Songs Based On: {baseTrack.name}</h3>
      )}
      <p>Adjust any of the following to include it in the recommendation algorithm!</p>
      <form>
        {/* Form to adjust TrackRecommendations call  */}
      </form>
      <table>
        <thead>
          <tr>
            <td>Track</td>
            <td>Artist</td>
            <td>Popularity</td>
          </tr>
        </thead>
        <tbody>
          {recommendations &&
            recommendations.map((track) => (
              <tr key={track.id}>
                <td>{track.name}</td>
                <td>{track.artists[0].name}</td>
                <td>{track.popularity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackRecommendations;
