import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';
import { JobStatus } from '@/types/job';

export interface GetJobsParams {
  status?: JobStatus;
  searchParam?: string;
  userId?: string;
}

export function useGetJobs({ searchParam, status, userId }: GetJobsParams) {
  const query = useQuery({
    queryKey: ['jobs', { searchParam, status, userId }],
    queryFn: async () => {
      const response = await client.api.jobs.$get({
        query: { q: searchParam, status, userId: userId }
      });

      if (!response.ok) {
        throw new Error('failed to fetch jobs');
      }

      return await response.json();
    }
  });

  return query;
}
