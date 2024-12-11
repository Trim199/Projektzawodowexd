
import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
  const [mushrooms, setMushrooms] = useState([]); 
  const [hoveredMushroom, setHoveredMushroom] = useState(null); 


  useEffect(() => {
    const fetchMushrooms = async () => {
      try {
        const response = await fetch('https://fungi-api.discoverlife.org/species?kingdom=Fungi&limit=10');
        const data = await response.json();
        const mushroomsData = data.map((item, index) => ({
          id: index,
          name: item.scientific_name,
          description: item.common_name || "Brak opisu",
          image: item.image_url || 'https://via.placeholder.com/150',
        }));
        setMushrooms(mushroomsData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchMushrooms();
  }, []);

  return (
    <div className="app">
      <h1>Lista grzybów</h1>
      <div className="mushroom-list">
        {mushrooms.map((mushroom) => (
          <div
            key={mushroom.id}
            className="mushroom-item"
            onMouseEnter={() => setHoveredMushroom(mushroom)}
            onMouseLeave={() => setHoveredMushroom(null)}
          >
            {mushroom.name}
          </div>
        ))}
      </div>
      {hoveredMushroom && (
        <div className="mushroom-details">
          <h2>{hoveredMushroom.name}</h2>
          <p>{hoveredMushroom.description}</p>
          <img src={hoveredMushroom.image} alt={hoveredMushroom.name} />
        </div>
      )}
    </div>
  );
};

export default App;