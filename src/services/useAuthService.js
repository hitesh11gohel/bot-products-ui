import Axios from "axios";

const useAuthService = () => {
  const signIn = async (cred) => {
    try {
      const userInfo = await Axios({
        method: "POST",
        url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/signin`,
        data: cred,
      });
      return userInfo;
    } catch (error) {
      return error;
    }
  };

  const signUp = async (cred) => {
    try {
      const newUser = await Axios({
        method: "POST",
        url: `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/users/create`,
        data: cred,
      });
      return newUser;
    } catch (error) {
      return error;
    }
  };

  return { signIn, signUp };
};

export default useAuthService;
