import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { extendTheme } from '@chakra-ui/react';
import { queryClient } from './utils/queryApi';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  const theme = extendTheme({
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
        onSuccess={() => {
          // resume mutations after initial restore from localStorage was successful
          queryClient.resumePausedMutations().then(() => {
            queryClient.invalidateQueries();
          });
        }}
      >
        <ChakraProvider theme={theme}>
          <HomePage />
        </ChakraProvider>
      </PersistQueryClientProvider>
    </QueryClientProvider>
  );
}

export default App;
