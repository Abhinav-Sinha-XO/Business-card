import React, { useState } from 'react';

function CreateCard({ token, userType }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [interest, setInterest] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('Submitting with token:', token); // Debug log
    console.log('User type:', userType); // Debug log

    try {
      const response = await fetch(`http://localhost:3000/${userType}/card`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          Interest: interest.split(',').map(i => i.trim()),
          linkedin,
          github
        })
      });

      console.log('Response status:', response.status); // Debug log
      const data = await response.json();
      console.log('Response data:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to create card');
      }

      alert('Card created successfully!');
      // Clear form
      setName('');
      setDescription('');
      setInterest('');
      setLinkedin('');
      setGithub('');
    } catch (err) {
      console.error('Error creating card:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h3>Create New Card</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateCard} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: '8px', minHeight: '100px' }}
        />
        <input
          type="text"
          placeholder="Interests (comma-separated)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <input
          type="url"
          placeholder="GitHub URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          required
          style={{ padding: '8px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Card'}
        </button>
      </form>
    </div>
  );
}

export default CreateCard;