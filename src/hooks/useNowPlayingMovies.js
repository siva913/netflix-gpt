// These Custom Hooks are just like normal Js functions
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
    //Fetch the now playing movies data from TMDB API and update the movies store
    const dispatch = useDispatch();

    const getNowPlayingMovies = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
      const jsonData = await data.json();
      dispatch(addNowPlayingMovies(jsonData.results));
  
    };
  
    useEffect(() =>{
      getNowPlayingMovies();
    }, []);
};

export default useNowPlayingMovies;