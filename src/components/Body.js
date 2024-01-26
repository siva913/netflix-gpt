import React, { useEffect } from 'react';
import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/browse',
            element: <Browse/>
        }
    ]);
    // To store the userdata globally so that we can access anywhere in app
    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // When user SignIn/SignUp
                const {uid, email, displayName, photoURL} = user;
                //action to add the user data to store 
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            } else {
                //when user Signs out
                //action to remove user data from store 
                dispatch(removeUser());
            }
        });

    },[]);

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body