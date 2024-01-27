// These Custom Hooks are just like normal Js functions
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
    //Fetch the Popular movies data from TMDB API and update the movies store
    const dispatch = useDispatch();

    const getPopularMovies = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
      const jsonData = await data.json();
      dispatch(addPopularMovies(jsonData.results));
  
    };
  
    useEffect(() =>{
      getPopularMovies();
    }, []);
};

export default usePopularMovies;