import React from "react";
import { useEffect, useState } from "react";

const GetUsersSpotifyProfile = ({
  setUserId,
}: {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [displayName, setDisplayName] = useState<string>("");
  const getDisplayName = async (accessToken: string) => {
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data["display_name"];
    } catch (error) {
      console.error("Error fetching profile details: ", error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      getDisplayName(accessToken).then((displayName) => {
        setDisplayName(displayName);
        getDisplayName(accessToken).then((id) => {
          setUserId(id);
        });
      });
    }
  }, [localStorage.getItem("access_token")]);

  return (
    <div className="admin-profile-details-container">
      <h3>Welcome, {displayName}!</h3>
    </div>
  );
};

export default GetUsersSpotifyProfile;
