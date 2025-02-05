import React, { useState, useEffect } from 'react';

function CardList({ token, userType }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/${userType}/card`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('Fetched cards:', data); // Debug log
      setCards(data.msg || []); // Backend returns cards in msg field
      setError(null);
    } catch (err) {
      console.error('Error fetching cards:', err);
      setError('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  // Fetch cards on mount and when token/userType changes
  useEffect(() => {
    fetchCards();
  }, [token, userType]);

  if (loading) return <div>Loading cards...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cards</h2>
      <button onClick={fetchCards}>Refresh Cards</button>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {cards.length === 0 ? (
          <p>No cards found</p>
        ) : (
          cards.map((card) => (
            <div key={card._id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#fff'
            }}>
              <h3>{card.name}</h3>
              <p>{card.description}</p>
              <div>
                <strong>Interests: </strong>
                {Array.isArray(card.Interest) ? card.Interest.join(', ') : card.Interest}
              </div>
              <div style={{ marginTop: '10px' }}>
                <a href={card.linkedin} target="_blank" rel="noopener noreferrer" 
                   style={{ marginRight: '10px' }}>LinkedIn</a>
                <a href={card.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CardList;