import React, { useEffect, useState } from "react";
import axios from "axios";

function CharacterCard({ character, openModal }) {
  const [imgSrc, setImgSrc] = useState("");

  // Unsplash API Key
  const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: { query: character.name, per_page: 1 },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        });
        if (response.data.results.length > 0) {
          setImgSrc(response.data.results[0].urls.small);
        } else {
          // Fallback in case no image is found for the character
          setImgSrc("https://via.placeholder.com/200x300?text=No+Image");
        }
      } catch (error) {
        console.error("Error fetching image from Unsplash", error);
        setImgSrc("https://via.placeholder.com/200x300?text=Error+Loading+Image");
      }
    };

    fetchImage();
  }, [character.name]);

  return (
    <div className="character-card" onClick={() => openModal(character)}>
      <h3>{character.name}</h3>
    </div>
  );
}

export default CharacterCard;
