import { TrackObject } from "./ChoosePlaylistForChart";

interface TrackProp {
  tracksOfSelectedPlaylist: TrackObject[];
}

const PlaylistTable: React.FC<TrackProp> = ({ tracksOfSelectedPlaylist }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Track</th>
          <th>Artist</th>
          <th>Popularity</th>
        </tr>
        {tracksOfSelectedPlaylist &&
          tracksOfSelectedPlaylist.map((track) => (
            // <div key={track.id}>
            //     <p>{track.name}</p>
            //     <p>{track.artists[0].name}</p>
            //     <p>{track.popularity}</p>
            // </div>
            <tr key={track.id}>
              <td>{track.name}</td>
              <td>{track.artists[0].name}</td>
              <td>{track.popularity}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default PlaylistTable;
