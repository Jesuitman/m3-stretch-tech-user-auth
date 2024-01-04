import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import './Card.css';
import modifyRelativeUrls from '../hooks/modifyRelativeUrls';
import PropTypes from "prop-types";

const Card = ({ snippet }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const sanitizedSnippet = DOMPurify.sanitize(modifyRelativeUrls(snippet));

  const snippetToShow = showFullContent ? sanitizedSnippet : sanitizedSnippet.slice(0, 2500) + '...';

  const handleTitleClick = () => {
    setShowFullContent(!showFullContent);
  };
  return (
    <div className="card">
      <article className="card-content" onClick={handleTitleClick}>
        <p dangerouslySetInnerHTML={{ __html: snippetToShow }} />
        <button className="saveButton">😡Save Controversy😡</button>
        <button className="favoriteButton">🤬Save as favorite controversy🤬</button>
      </article>
    </div>
  );
};

export default Card;

Card.propTypes = {
  snippet: PropTypes.string.isRequired,
};