import { useRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: "",
  });

  const setUserAuthInfo = ({ data }) => {
    const token = localStorage.setItem("token", data.data);

    setAuthState({
      token,
    });
  };
  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    // if (!authState.token) {
    //   return false;
    // }
    return console.log("test");
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  const { data: session } = useSession();
  console.log(session);

  // const isLoggedIn = authContext.isUserAuthenticated();
  useEffect(() => {
    if (session === null && router.asPath === "/login") {
      return console.log("log");
    } else if (session === null && router.asPath !== "/") {
      router.push("/");
      console.log("works");
    }
    // (session === undefined || null) &&
    // window.location.pathname !== "/profile"
    // else {
    //   router.push("/");
    //   console.log("big nonon");
    // }
  }, [router.asPath]);

  return children;
};
