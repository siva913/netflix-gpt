import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { backgroundLogo } from '../utils/constants';

const GptSearchPage = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          src={backgroundLogo}
          alt="bg-logo"
        />
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchPage;