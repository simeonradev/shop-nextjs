import { Provider } from "react-redux";

import { wrapper } from "../core/store";

import { GlobalModal } from "../components/useModal";
import { GlobalTheme } from "../components/useMUITheme";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { ProtectRoute } from "../components/ProtectRoute";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  ...rest
}) => {
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <GlobalTheme>
          <GlobalModal>
            <NavBar />

            <ProtectRoute>
              <Component {...pageProps} />
            </ProtectRoute>
          </GlobalModal>
        </GlobalTheme>
      </SessionProvider>
    </Provider>
  );
};

export default MyApp;
