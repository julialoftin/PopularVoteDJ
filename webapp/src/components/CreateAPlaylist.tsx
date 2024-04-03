interface AdminProps {
    userId: string;
}

const CreateAPlaylist: React.FC<AdminProps> = ({ userId }) => {

    // Call playlist end point here

    return (
        <div>
            <h4>Create a playlist for your event!</h4>
            <form>
                <input type="text" name="playlistName" placeholder="Playlist Name" />
                <input type="text" name="playlistDescription" placeholder="Playlist Description" />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateAPlaylist;