const GetTrack = async (track_id: string) => {
    try {
      const accessToken = sessionStorage.getItem("access_token");
      const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
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
      console.error("Error fetching track: ", error);
    }
  };
  
  export default GetTrack;