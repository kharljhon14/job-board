import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export function useGetJobs(searchParam?: string) {
  const query = useQuery({
    queryKey: ['jobs', searchParam],
    queryFn: async () => {
      const response = await client.api.jobs.$get({ query: { q: searchParam } });

      if (!response.ok) {
        throw new Error('failed to fetch jobs');
      }

      return await response.json();
    }
  });

  return query;
}
