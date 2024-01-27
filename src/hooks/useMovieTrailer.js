import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    
    //get all the videos related to the movie and filter out trialer video and then store it globally in redux store
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);
        const json = await data.json();
        const filteredData = json.results.filter((video) => video.type === 'Trailer');
        const trailer = filteredData?.length ? filteredData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));

    };
    useEffect(() =>{
        getMovieVideos();

    },[]);
};

export default useMovieTrailer;