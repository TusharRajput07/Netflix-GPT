export const validateFormData = (
  email,
  password,
  confirmPassword,
  name,
  isSignUp
) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (isSignUp && !name?.trim()) {
    return "enter valid name";
  }
  if (!isEmailValid) return "email is not valid";
  if (!isPasswordValid)
    return "password should have atleast 8 characters. one capital, one small alphabet, and one digit.";
  if (isSignUp && password != confirmPassword)
    return "both passwords should be same";

  return null;
};
