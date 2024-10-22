import React, { useState, useEffect } from "react";

function CharacterModal({ character, closeModal }) {
  const [homeworld, setHomeworld] = useState("");
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchHomeworld = async () => {
      const response = await fetch(character.homeworld);
      const data = await response.json();
      setHomeworld(data.name);
    };
    const fetchFilms = async () => {
      const filmPromises = character.films.map(filmUrl => fetch(filmUrl).then(res => res.json()));
      const filmsData = await Promise.all(filmPromises);
      setFilms(filmsData.map(film => film.title));
    };
    fetchHomeworld();
    fetchFilms();
  }, [character]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{character.name}</h2>
        <p>Height: {character.height} cm</p>
        <p>Mass: {character.mass} kg</p>
        <p>Birth Year: {character.birth_year}</p>
        <p>Homeworld: {homeworld}</p>
        <p>Films: {films.join(", ")}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default CharacterModal;
