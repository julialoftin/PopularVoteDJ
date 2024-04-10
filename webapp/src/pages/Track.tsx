import * as echarts from "echarts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { TrackObject } from "../components/ChoosePlaylistForChart";
import GetTrack from "../SpotifyAPICalls/GetTrack";
import GetTrackAudioFeatures, { AudioFeature } from "../SpotifyAPICalls/GetTrackAudioFeatures";

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState<TrackObject>();
  const [audioFeatures, setAudioFeatures] = useState<AudioFeature>();

  useEffect(() => {
    if (id != undefined) {
      GetTrack(id).then((result) => {
        setTrack(result);
      });
    }
  }, [id]);

  useEffect(() => {
    if (track != undefined) {
      GetTrackAudioFeatures(track.id).then((result) => {
        setAudioFeatures(result);
      });
    }
  }, [track]);

  useEffect(() => {
    const createChart = () => {
      const chart = document.getElementById("track-chart");
      const trackChart = echarts.init(chart, null, {
        width: 600,
        height: 400
      });
      if (track != undefined && audioFeatures != undefined) {
        const option = {
          legend: {
            data: [track.name],
          },
          radar: {
            indicator: [
              { name: "Acousticness", max: 1 },
              { name: "Danceability", max: 1 },
              { name: "energy", max: 1 },
              { name: "instrumentalness", max: 1 },
              { name: "key", max: 9 },
              { name: "liveness", max: 1 },
              { name: "modality", max: 1 },
              { name: "speechiness", max: 1 },
              { name: "tempo", max: 250 },
              { name: "valence", max: 1 },
            ],
          },
          series: [
            {
              type: "radar",
              data: [
                {
                  value: [
                    audioFeatures.acousticness,
                    audioFeatures.danceability,
                    audioFeatures.energy,
                    audioFeatures.instrumentalness,
                    audioFeatures.key,
                    audioFeatures.liveness,
                    audioFeatures.mode,
                    audioFeatures.speechiness,
                    audioFeatures.tempo,
                    audioFeatures.valence,
                  ],
                  name: [track.name],
                },
              ],
            },
          ],
        };
        console.log(option);
        option && trackChart.setOption(option);
      }
    };
    createChart();
  }, []);

  return (
    <div>
      <AdminNavbar />
      {track && (
        <h3 key={track.id}>
          {track.name} - {track.artists[0].name}
        </h3>
      )}
      {audioFeatures && (
        <div>
          <p>{audioFeatures.acousticness}</p>
          <p>{audioFeatures.danceability}</p>
        </div>
      )}
      {/* Need to set width and height? */}
      <div id="track-chart"></div>
    </div>
  );
};

export default Track;
