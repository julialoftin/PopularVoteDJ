
interface CreatePlaylistInfo {
  name: string;
  description: string;
}

const callSpotifyCreatePlaylist = async (
  createPlaylistInfo: CreatePlaylistInfo
) => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const userId = sessionStorage.getItem("userId");
    const response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPlaylistInfo),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log(response);
  } catch (error) {
    console.error("Error posting new playlist: ", error);
  }
};

const CreateAPlaylist = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name: string = (
      document.getElementById("playlistName") as HTMLInputElement
    ).value;
    const description: string = (
      document.getElementById("playlistDescription") as HTMLInputElement
    ).value;
    const playlistInfo = {
      name: name,
      description: description,
    };

    callSpotifyCreatePlaylist(playlistInfo);
  };

  return (
    <div>
      <h4>Create a playlist for your event!</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="playlistName"
          name="playlistName"
          required
          placeholder="Playlist Name"
        />
        <input
          type="text"
          id="playlistDescription"
          name="playlistDescription"
          required
          placeholder="Playlist Description"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAPlaylist;
