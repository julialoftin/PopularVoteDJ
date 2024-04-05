import { useEffect, useState } from "react";

const HostEventForm = () => {
    const [newOrExistingRadioState, setNewOrExistingRadioState] = useState<string>("")
  const handleNewOrExistingPlaylistFormChange = () => {
    const newPlaylist = document.getElementById(
      "newPlaylist"
    ) as HTMLInputElement;
    const existingPlaylist = document.getElementById(
      "existingPlaylist"
    ) as HTMLInputElement;
    const playlistName = document.getElementById(
      "playlistName"
    ) as HTMLInputElement;
    const playlistDescription = document.getElementById(
      "playlistDescription"
    ) as HTMLInputElement;

    if (newPlaylist.checked) {
        setNewOrExistingRadioState("new");
      playlistName.style.visibility = "visible";
      playlistDescription.style.visibility = "visible";
    } else if (existingPlaylist.checked) {
        setNewOrExistingRadioState("existing");
      playlistName.style.visibility = "hidden";
      playlistDescription.style.display = "hidden";
    }
  };

  return (
    <div>
      <h3>Hosting an event? Fill out this form to get started!</h3>
      <form>
        <input
          type="radio"
          id="newPlaylist"
          name="newOrExistingPlaylist"
          value="newPlaylist"
          onChange={handleNewOrExistingPlaylistFormChange}
        />
        <label htmlFor="newPlaylist">Create a New Playlist</label>

        <input
          type="radio"
          id="existingPlaylist"
          name="newOrExistingPlaylist"
          value="existingPlaylist"
          onChange={handleNewOrExistingPlaylistFormChange}
        />
        <label htmlFor="existingPlaylist">Use a playlist I already have</label>

        <label htmlFor="playlistName">
          <input
            type="text"
            id="playlistName"
            name="playlistName"
            placeholder="Playlist Name"
          />
        </label>

        <label htmlFor="playlistDescription">
          <input
            type="text"
            id="playlistDescription"
            name="playlistDescription"
            placeholder="Playlist Description"
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default HostEventForm;
