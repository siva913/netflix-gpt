// These Custom Hooks are just like normal Js functions
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
    //Fetch the Upcoming movies data from TMDB API and update the movies store
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.movies?.upcomingMovies);

    const getUpcomingMovies = async() => {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      const jsonData = await data.json();
      dispatch(addUpcomingMovies(jsonData.results));
  
    };
  
    useEffect(() =>{
      if(!upcomingMovies) getUpcomingMovies();
    }, []);
};

export default useUpcomingMovies;