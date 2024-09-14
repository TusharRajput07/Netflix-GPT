import { useRef, useState } from "react";
import HeaderStart from "./HeaderStart";
import useAuth from "../utils/useAuth";
import Footer from "./Footer";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);
  const nameRef = useRef(null);

  const { errorMessage, authenticate } = useAuth();

  const handleClick = () => {
    authenticate(
      isSignUp,
      emailRef?.current?.value,
      passwordRef?.current?.value,
      confirmRef?.current?.value,
      nameRef?.current?.value
    );
  };

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="w-full overflow-hidden">
      <HeaderStart />
      <div className="relative w-full overflow-hidden">
        <img
          className="brightness-50 scale-x-150 md:scale-125 w-full h-[100vh] md:h-full"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_small.jpg"
        />
        <div className="absolute top-0 bg-gradient-to-t from-black h-[100vh] md:h-full w-full"></div>
      </div>

      <form className="absolute top-[20vh] left-1/2 -translate-x-1/2 text-white w-[300px] md:w-[450px] px-6 md:px-16 py-6 md:py-12 box-border bg-black bg-opacity-70 p-4">
        <div className="font-bold mb-4 md:mb-7 text-2xl md:text-3xl">
          {isSignUp ? "Sign Up" : "Sign In"}
        </div>
        {isSignUp && (
          <input
            ref={nameRef}
            className="w-full my-2 py-2 md:py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          ref={emailRef}
          className="w-full my-2 py-2 md:py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
          type="email"
          placeholder="Email"
        />
        <input
          ref={passwordRef}
          className="w-full my-2 py-2 md:py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
          type="password"
          placeholder="Password"
        />
        {isSignUp && (
          <input
            ref={confirmRef}
            className="w-full my-2 py-2 md:py-4 rounded-sm px-2 bg-transparent border border-[#5E5F60]"
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
    </div>
  );
};

export default Login;
