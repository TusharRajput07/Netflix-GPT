import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateFormData } from "./validateFormData";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const authenticate = (isSignUp, email, password, confirmPassword, name) => {
    // VALIDATION
    let response;
    if (isSignUp) {
      response = validateFormData(email, password, confirmPassword, name, true);
    } else {
      response = validateFormData(email, password);
    }

    setErrorMessage(response);

    if (response !== null) return;

    // SIGN UP/SIGN BY USING FIREBASE APIs

    if (isSignUp) {
      // SIGN UP
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up successfully
          // NOW ADDING ADDITIONAL USER INFORMATION TO THE DATABASE (NAME)
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              dispatch(addUser({ displayName: auth.currentUser?.displayName }));
              // Profile updated!
            })
            .catch((error) => {
              // An error occurred
            });
          navigate("/browse");
        })
        .catch((error) => {
          // error while signing in
          setErrorMessage("email already exists");
        });
    } else {
      // SIGN IN
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in successfully
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          // error while signing up
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("invalid user credentials");
        });
    }
  };

  return { errorMessage, authenticate };
};

export default useAuth;
