import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { backgroundLogo, defaultPhotoUrl } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true); // To toggle the form to signin and signup 
  const [errorMessage, setErrorMessage] = useState(null); // To set the error message
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Validate the form Data
    const message = checkValidData(name.current?.value, email.current?.value, password.current?.value);
    setErrorMessage(message);

    if(message) return; // Then there is a validation error so dont execute the below code 

    //SignIn and Signup Logic
    if(!isSignInForm) { // For SignUp logic
      createUserWithEmailAndPassword(auth, email.current?.value, password.current?.value)
        .then((userCredential) => {
        const user = userCredential.user;
        // To Update display name and photoUrl
        updateProfile(user, {
          displayName: name.current.value, photoURL: defaultPhotoUrl
        }).then(() => {
          // Again call the action to store displayName, photoURL as uid,email,password will be stored in store using onAuthChange in Body.js 
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + '-' + errorMessage);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + '-' + errorMessage);
      });
  } 
  else { // For SignIn logic
    signInWithEmailAndPassword(auth, email.current?.value, password.current?.value)
      .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + '-' + errorMessage);
    });
    }
  }

  
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={backgroundLogo}
          alt="bg-logo"
        />
      </div>
      <form onSubmit = {(e) => e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name} // to get the reference of this input element
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
          )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-3">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already a Registered User? Sign In Now"}
        </p>
      </form>
    </div>
  );
};
export default Login;