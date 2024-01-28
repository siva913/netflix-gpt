import React, { useRef, useState } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const languageKey = useSelector(store => store.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [apiErrorMessage, setApisErrorMessage] = useState('');

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
  
      return json.results;
    };
  const handleGptSearchClick = async() => {
    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Jersey, Temper, Don, Fighter, Koi Mil Gaya";

    try {
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResults.choices?.[0]?.message?.content); // Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); // ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movieName I will search Information in TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //promiseArray doesnt have data it has array of promises [Promise, Promise, Promise, Promise, Promise]
    
    const tmdbResults = await Promise.all(promiseArray);// Promise.all waits for all the 5 promises to be fulfilled and then return the data
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  }

  catch (error) {
    console.error("Open API Failed");
    setApisErrorMessage('Open API Failed, Please Try Again After Sometime');
  }
    
  };
  
    return (
      <>
      <div className="pt-[10%] flex justify-center">
        {/* Grid with 12 cols used to style Search Bar and Search Button  */}
        <form onSubmit={(e) => e.preventDefault()} className=" w-1/2 bg-black grid grid-cols-12">
          <input
            ref={searchText}
            type="text"
            className=" p-4 m-4 col-span-9"
            placeholder={lang[languageKey]?.gptSearchPlaceholder}
          />
          <button onClick={handleGptSearchClick} className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
            {lang[languageKey]?.search}
          </button>
        </form>
        
      </div>
      {apiErrorMessage && <div> 
      <p className='mx-80 text-white font-bold'>{apiErrorMessage}</p>
    </div>}
    </>
    );
  };
  export default GptSearchBar;