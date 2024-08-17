import { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const [items, setItems] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('https://j4min265ic5gilfas2dauaxf3a0jhtpe.lambda-url.ap-southeast-2.on.aws/items/')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleExpandClick = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null); 
      setSelectedItem(null);
    } else {
      fetch(`https://j4min265ic5gilfas2dauaxf3a0jhtpe.lambda-url.ap-southeast-2.on.aws/items/${id}`)
        .then(response => response.json())
        .then(data => {
          setExpandedCard(id);
          setSelectedItem(data);
        })
        .catch(error => console.error('Error fetching item details:', error));
    }
  };

  return (
    <div className="card-container">
      {items.map((item) => (
        <div
          key={item.id}
          className="card"
          style={{
            backgroundColor: expandedCard === item.id ? 'lightgray' : 'gray',
            color: expandedCard === item.id ? 'black' : 'white',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
          onClick={() => handleExpandClick(item.id)}
        >
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>ID: {item.id}</span>
            <span style={{ fontWeight: 'bold' }}>
              {expandedCard === item.id ? '-' : '+'}
            </span>
          </div>
          {expandedCard === item.id && selectedItem && (
            <div className="card-details" style={{ marginTop: '10px' }}>
              <p>Name: {selectedItem.name}</p>
              <p>Class: {selectedItem.class}</p>
              <p>Percentage: {selectedItem.percent}%</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default withAuthenticator(App);
