import React, { useState } from 'react';
import Header from './components/header';
import ArticleInput from './components/articleInput';
import SummaryDisplay from './components/summaryDisplay';

const App = () => {
  const [summary, setSummary] = useState(''); // State to store summarized text

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ArticleInput setSummary={setSummary} />
        <SummaryDisplay summary={summary} />
      </main>
    </div>
  );
};

export default App;
