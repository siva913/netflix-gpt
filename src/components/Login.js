import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true); // To toggle the form to signin and signup 
  const [errorMessage, setErrorMessage] = useState(null); // To set the error message
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

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
        console.log(user);
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
      console.log(user);
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
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
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