// These Custom Hooks are just like normal Js functions
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
    //Fetch the Top Rated movies data from TMDB API and update the movies store
    const dispatch = useDispatch();

    const getTopRatedMovies = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
      const jsonData = await data.json();
      dispatch(addTopRatedMovies(jsonData.results));
  
    };
  
    useEffect(() =>{
      getTopRatedMovies();
    }, []);
};

export default useTopRatedMovies;