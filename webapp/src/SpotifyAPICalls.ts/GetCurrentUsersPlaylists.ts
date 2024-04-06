const GetCurrentUsersPlaylists = async () => {
  try {
    const accessToken = sessionStorage.getItem("access_token");
    const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
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
    console.error("Error fetching all playlists: ", error);
  }
};

export default GetCurrentUsersPlaylists;
