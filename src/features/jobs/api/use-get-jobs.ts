import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export function useGetJobs() {
  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await client.api.jobs.$get({ query: {} });

      if (!response.ok) {
        throw new Error('failed to fetch jobs');
      }

      return await response.json();
    }
  });

  return query;
}
