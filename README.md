# Netflix GPT
- Created a React App

- Configured Tailwing CSS in the app https://tailwindcss.com/docs/guides/create-react-app

- reat-route-dom used for routing

- Header which consits of Netflix Logo(learn about background gradient, z-index, aspect ratio, opacity, hover, overflow-x-scroll)

- Login Form(SignUp and SignIn Forms)

- Form Validation(In form onSubmit = {(e) => e.preventDefault()} used to prevent default submission)

- UseRef

- Firebase Setup

- Deploying app to production(We can change url name by purchasing domain and add it in build hosting section in firebase)

- Authentication - SignIn and SignUp user apis createUserWithEmailAndPassword,signInWithEmailAndPassword (using FireBase)

- Created Redux Store with userSlice

- Implemented SignOut

- Update Profile(dipslay name and photo url)

- Bug Fix : SignUp user displayname and photo url

- Bug Fix : If user is not signed in if user enters /browse then redirect it to /login and viceversa

- Unsubscribed onAuthstateChanged callback

- Dont use any hardcoded values like strings directly in app , declare them as constants 

- Register in  TMDB API & create an app to get access token 

- Get Data from TMDB now playing movies list API

- Created custom hook for now playing movies list

- Created movieSlice and updated store with movies data

- Inside Browse Page
  MainContainer
    - VideoBackground
    - VideoTitle
  SecondaryContainer
    - MoviesList * n 
    - Moviecards * n 

- Fetch Movie Videos and filter trailer video and store it in redux store

- Implemented MainContainer Embedded youtube video and make it autoplay and mute (add this in src of iframe ?&autoplay=1&mute=1)

- Implemented Secondary Container with MovieList, MovieCards

- Implemented Custom Hooks for different types of movies

- GPT Search Page

- GPT Search Bar

- Implemented Multilingual(4 languages) support for GPT Search bar


# Features
Go to netflix.com

- Login/SignUp 
    - Login/SignUp Form
    - After authentication redirect to Browse page

- Browse page
    - Header
    - Main Movie
        - Its Trailer in background
        - Its title and description
    - Other Movies suggestions
        - MovieLists * n (vertiacally scrollable)

- Netflix GPT
    - Search Bar
    - Suggestions related to search text
