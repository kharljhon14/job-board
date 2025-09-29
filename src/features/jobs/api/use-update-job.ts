import { useMutation } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.jobs)[':id']['$patch']>;
type RequestType = InferRequestType<(typeof client.api.jobs)[':id']['$patch']>['json'];

export function useUpdateJob(id?: string) {
  const mutataion = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.jobs[':id']['$patch']({ param: { id: id || '' }, json });

      return await response.json();
    }
  });

  return mutataion;
}
