import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

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
    return fetchIcons('all');
  },
});

const fetchIcons = async category => {
  const res = await await axios.get(
    `https://intranet.noorahealth.org/icons/api/v1/icons/?limit=16&category=${category}`
  );
  return res.data;
};
const fetchCategory = async () => {
  const res = await await axios.get(
    `https://intranet.noorahealth.org/icons/api/v1/categories/`
  );
  return res.data;
};
export { queryClient, fetchIcons, fetchCategory };
