import React from 'react';

/**
 * SummaryDisplay component shows the summarized content
 * and allows users to copy it to the clipboard.
 */
const SummaryDisplay = ({ summary }) => {
  // Function to copy the summary to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(summary); // Copy text to clipboard
    alert('Summary copied to clipboard!'); // Show confirmation alert
  };

  if (!summary) return null; // Do not render if no summary exists

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg font-bold text-gray-800">Article Summary</h2>
      <p className="mt-4 text-gray-700 whitespace-pre-line">{summary}</p>
      {/* Copy to clipboard button */}
      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default SummaryDisplay;
