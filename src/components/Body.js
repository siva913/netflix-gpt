import React from 'react';
import Login from './Login';
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Body = () => {
    //As we defined router in Body we can use navigate to navigate to  different routes only inside Login, Browse and their child components like header  and not in Body or App components.
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


  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body