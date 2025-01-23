import React, { useState } from 'react';
import axios from 'axios';

/**
 * ArticleInput component handles user input for the article URL
 * and makes an API call to summarize the content using OpenAI GPT-3.
 */
const ArticleInput = ({ setSummary }) => {
  const [url, setUrl] = useState(''); // State to store the input URL
  const [loading, setLoading] = useState(false); // Loading state during API call
  const [error, setError] = useState(''); // Error state for invalid inputs or API errors

  // Function to handle retry with exponential backoff
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Handles the "Summarize" button click to fetch summarized content.
   * Validates the URL input and makes an API call to OpenAI GPT-3.
   */
  const handleSummarize = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL.'); // Show error if the URL is empty
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true); // Show loading state

    const maxRetries = 5; // Maximum retry attempts
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        // Use OpenAI GPT-3 API for article summarization with correct endpoint
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions', // Use the chat/completions endpoint
          {
            model: 'gpt-3.5-turbo', // Specify the model (gpt-3.5-turbo is often used)
            messages: [
              {
                role: 'system',
                content: 'You are an assistant that summarizes articles.',
              },
              {
                role: 'user',
                content: `Summarize the article found at: ${url}`,
              },
            ],
            max_tokens: 150, // Limit the number of tokens for the summary
            temperature: 0.5, // Control the randomness of the output (0 = deterministic, 1 = random)
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `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`, // Your OpenAI API key
            },
          }
        );

        console.log('API Response:', response.data); // Log the successful response
        setSummary(response.data.choices[0].message.content.trim()); // Get summary from the API response
        success = true; // Successfully completed the request
      } catch (err) {
        console.error('API Error:', err); // Log the error response

        if (err.response && err.response.status === 429) {
          // If rate-limited (status code 429), retry after a delay
          attempts += 1;
          setError(`Rate limit exceeded. Retrying... (${attempts}/${maxRetries})`);
          const delayTime = Math.pow(2, attempts) * 1000; // Exponential backoff
          await delay(delayTime); // Wait before retrying
        } else {
          setError('Failed to fetch summary. Please try again.'); // Other errors
          break;
        }
      } finally {
        setLoading(false); // Hide loading state after the API call
      }
    }

    if (!success) {
      setError('Failed to fetch summary after multiple attempts.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6">
      <label htmlFor="url" className="block text-lg font-medium text-gray-700">
        Article URL
      </label>
      <input
        type="url"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)} // Update URL input value
        placeholder="Enter the article URL"
        className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      <button
        onClick={handleSummarize} // Trigger summarize on click
        className={`mt-4 px-4 py-2 text-white font-semibold rounded-md ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={loading} // Disable button during loading
      >
        {loading ? 'Summarizing...' : 'Summarize'} {/* Button text during loading */}
      </button>
    </div>
  );
};

export default ArticleInput;