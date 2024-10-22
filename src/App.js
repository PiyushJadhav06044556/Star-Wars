import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import CharacterModal from "./CharacterModal";
import "./styles.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 5;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };
    fetchCharacters();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openModal = (character) => {
    setSelectedCharacter(character);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="app">
      <header>
        <h1>Star Wars Characters</h1>
      </header>

      {loading ? (
        <div id="loader">Loading...</div>
      ) : error ? (
        <div id="error">{error}</div>
      ) : (
        <>
          <div id="characterContainer">
            {characters.map((character) => (
              <CharacterCard key={character.name} character={character} openModal={openModal} />
            ))}
          </div>

          <div id="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage}>
              Next
            </button>
          </div>

          {showModal && <CharacterModal character={selectedCharacter} closeModal={closeModal} />}
        </>
      )}
    </div>
  );
}

export default App;
