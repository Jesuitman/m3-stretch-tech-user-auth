import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './Card.css';

// const removeLinks = (text) => {
//     return text.replace(/<a\b[^>]*>(.*?)<\/a>/g, '$1');
//   };

const Card = ({ title, snippet }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const snippetToShow = showFullContent ? snippet : snippet.slice(0, 2500) + '...';
  
  const handleTitleClick = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="card" onClick={handleTitleClick}>
      <div className="card-content">
        <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(snippetToShow) }} />
        <button className="saveButton">😡Save Controversy😡</button>
            <button className="favoriteButton">🤬Save as favorite controversy🤬</button>
      </div>
    </div>
  );
};

export default Card;

// 20:         <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(removeLinks(snippetToShow)) }} />
