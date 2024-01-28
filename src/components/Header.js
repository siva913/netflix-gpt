import React, { useEffect } from 'react';
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { SUPPORTED_LANGUAGES, netflixLogo } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt?.showGptSearch);

    // To store the userdata globally so that we can access anywhere in app
    useEffect(() =>{
        // It is like a event listener which calls when there is auth state changes
        const unsubscribe  = onAuthStateChanged(auth, (user) => {
            if (user) {
                // When user SignIn/SignUp
                const {uid, email, displayName, photoURL} = user;
                //action to add the user data to store 
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                navigate('/browse');
            } else {
                //when user Signs out
                //action to remove user data from store 
                dispatch(removeUser());
                navigate('/');
            }
        });

        // Unsubscribe the onAuthStateChanged event listener when component unmounts
        return () => unsubscribe();

    },[]);
  const handleGptSearchClick = () => {
    // To toggle the GPT Search View
    dispatch(toggleGptSearchView());
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('Signed out');
    }).catch((error) => {
      navigate('/ErrorPage');
    });
    
  };

  const handleLanguageChange = (e) => {
    // When a option is selected in dropdown we can get value of selected option of dropdown using e.target.value
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
      className='w-44'
      src={netflixLogo}
      alt="netflixLogo" />
      {user && <div className='flex p-2' >
        {showGptSearch && <select className='p-2 m-2 bg-gray-900 text-white cursor-pointer' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang => <option value={lang.identifier} key={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button onClick = {handleGptSearchClick} className='py-2 px-4 mx-4 my-2 bg-purple-700 text-white rounded-lg'>{showGptSearch ? 'Home' : 'GPT Search'}</button>
        {/* <img  
        className='w-12 h-12 cursor-pointer'
        src={user?.photoURL} alt="usericon" /> */}
        <button onClick={handleSignOut} className='font-bold text-white'> Sign Out </button>
      </div>}
    </div>

  )
}

export default Header