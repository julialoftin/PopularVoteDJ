
const CreateAPlaylist = () => {

    return (
        <div>
            <h4>Create a playlist for your event!</h4>
            <form>
                <input type="text" name="playlistName" placeholder="Playlist Name" />
                <input type="text" name="playlistDescription" placeholder="Playlist Description" />
            </form>
        </div>
    )
}

export default CreateAPlaylist;