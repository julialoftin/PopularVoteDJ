import { useEffect, useState } from "react";

const GetUsersSpotifyProfile = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const getDisplayNameAndImage = async () => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setDisplayName(data["display_name"]);
    } catch (error) {
      console.error("Error fetching profile details: ", error);
    }
  };
  getDisplayNameAndImage();

  return (
    <div className="admin-profile-details-container">
      <h3>Welcome, {displayName}!</h3>
    </div>
  );
};

export default GetUsersSpotifyProfile;
