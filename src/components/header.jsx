import React from 'react';

/**
 * Header component displaying the application title and subtitle.
 * Styled with beautiful gradients and fade-in animation.
 */
const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-6 shadow-lg">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold tracking-wide animate-fade-in">
        Article Summarizer
      </h1>
      <p className="text-center text-sm md:text-base mt-2 opacity-80">
        Summarize articles instantly by providing the URL!
      </p>
    </header>
  );
};

export default Header;
