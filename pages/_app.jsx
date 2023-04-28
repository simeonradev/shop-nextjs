// import { Provider } from "react-redux";
// import { wrapper } from "../core/store";

import { useState } from "react";

import { GlobalModal } from "../components/useModal";
import { GlobalTheme } from "../components/useMUITheme";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { ProtectRoute } from "../components/ProtectRoute";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import localForage from "localforage";

import { Hydrate, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  // ...rest
}) => {
  // const { store } = wrapper.useWrappedStore(rest);

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: localForage,
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    // <Provider store={store}>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations();
      }}
    >
      <Hydrate state={pageProps?.dehydratedState}>
        <SessionProvider session={session}>
          <GlobalTheme>
            <GlobalModal>
              <NavBar />
              <ReactQueryDevtools />

              <ProtectRoute>
                <Component {...pageProps} />
              </ProtectRoute>
            </GlobalModal>
          </GlobalTheme>
        </SessionProvider>
      </Hydrate>
    </PersistQueryClientProvider>
    // </Provider>
  );
};

export default MyApp;
