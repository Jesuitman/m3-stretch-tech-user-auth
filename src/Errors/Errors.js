import React from 'react';

const errorMessage = ({ errorMessage }) => {
  return (
    <div className="error-page">
      <h2>Error Encountered</h2>
      <p>{errorMessage}</p>
      {/* Additional Error messages */}
    </div>
  );
};

export default errorMessage;