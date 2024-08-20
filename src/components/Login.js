import { useRef, useState } from "react";
import HeaderStart from "./HeaderStart";
import { validateFormData } from "../utils/validateFormData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const nameRef = useRef(null);

  const handleClick = () => {
    let response;
    if (isSignUp) {
      response = validateFormData(
        emailRef.current.value,
        passwordRef.current.value,
        confirmRef.current.value,
        nameRef.current.value,
        true
      );
    } else {
      response = validateFormData(
        emailRef.current.value,
        passwordRef.current.value
      );
    }
    setErrorMessage(response);

    if (response !== null) return;

    // sign up / sign in authentication

    if (isSignUp) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("email already exists");
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("invalid user credentials");
        });
    }
  };

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div>
      <HeaderStart />
      <div className="h-full w-full overflow-hidden relative">
        <img
          className="brightness-50 scale-125 translate-y-[-10%] w-full h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
        />
        {/* <div className="bg-slate-500 text-4xl absolute z-10">jdbfjsd</div> */}
      </div>

      <form className="absolute mt-28 top-0 left-1/2 -translate-x-1/2 text-white w-[450px] px-16 py-12 box-border bg-black bg-opacity-70 p-4">
        <div className="font-bold mb-7 text-3xl">
          {isSignUp ? "Sign Up" : "Sign In"}
        </div>
        {isSignUp && (
          <input
            ref={nameRef}
            className="w-full my-2 py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          ref={emailRef}
          className="w-full my-2 py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
          type="email"
          placeholder="Email or mobile number"
        />
        <input
          ref={passwordRef}
          className="w-full my-2 py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
          type="password"
          placeholder="Password"
        />
        {isSignUp && (
          <input
            ref={confirmRef}
            className="w-full my-2 py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
            type="password"
            placeholder="Confirm password"
          />
        )}
        <div className="text-red-700 text-sm">{errorMessage}</div>
        <div
          onClick={handleClick}
          className="bg-red-600 text-base text-center font-semibold py-2 px-4 m-auto cursor-pointer mt-4 rounded-md hover:bg-red-700 transition ease-in-out delay-75"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </div>
        <div className="mt-6">
          <span className="mr-1">
            {isSignUp ? "Already a user?" : "New to Netflix?"}
          </span>
          <span
            onClick={handleSignUp}
            className="cursor-pointer font-bold hover:underline"
          >
            {isSignUp ? "Log in" : "Sign up now."}
          </span>
        </div>
      </form>

      <div className="bg-[#232323] h-2"></div>

      <div className="bg-black text-white py-40 text-center font-extrabold text-2xl">
        Footer...
      </div>
    </div>
  );
};

export default Login;
