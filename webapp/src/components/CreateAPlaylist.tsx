interface AdminProps {
    userId: string;
}

interface CreatePlaylistInfo {
    playlistName: string;
    playlistDescription: string;
}

const callSpotifyCreatePlaylist = async (createPlaylistInfo: CreatePlaylistInfo) => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(createPlaylistInfo),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    }
}

const CreateAPlaylist: React.FC<AdminProps> = ({ userId }) => {

    
    // Call playlist end point here
    



    return (
        <div>
            <h4>Create a playlist for your event!</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="playlistName" placeholder="Playlist Name" />
                <input type="text" name="playlistDescription" placeholder="Playlist Description" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateAPlaylist;