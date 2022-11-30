import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/HomePage';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import axios from 'axios';
import { extendTheme } from '@chakra-ui/react';

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
export const fetchIcons = async category => {
  const res = await await axios.get(
    `https://staging.noorahealth.org/icons/api/v1/icons/?limit=16&category=${category}`
  );
  return res.data;
};
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  queryClient.setMutationDefaults(['all'], {
    mutationFn: async () => {
      // to avoid clashes with our optimistic update when an offline mutation continues
      await queryClient.cancelQueries('all');
      return fetchIcons();
    },
  });

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
