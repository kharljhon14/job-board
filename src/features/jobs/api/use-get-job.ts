import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export function useGetJob(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['job', { id }],
    queryFn: async () => {
      const response = await client.api.jobs[':id'].$get({
        param: { id: id || '' }
      });

      if (!response.ok) {
        throw new Error('failed to fetch job');
      }

      return await response.json();
    }
  });

  return query;
}
