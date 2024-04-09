const GetPlaylistItems = async (playlist_id: string) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching playlist's tracks: ", error);
    }
  };
  
  export default GetPlaylistItems;
  