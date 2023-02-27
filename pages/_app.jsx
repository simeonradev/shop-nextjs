import { Provider } from "react-redux";

import { wrapper } from "../core/store";

import { GlobalModal } from "../components/useModal";
import { GlobalTheme } from "../components/useMUITheme";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ProtectRoute } from "../components/authContext";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  ...rest
}) => {
  const { store } = wrapper.useWrappedStore(rest);
  // const router = useRouter();
  // console.log(router.asPath, router.query);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <GlobalTheme>
          <GlobalModal>
            <ProtectRoute>
              <NavBar />

              <Component {...pageProps} />
            </ProtectRoute>
          </GlobalModal>
        </GlobalTheme>
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
