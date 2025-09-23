import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<typeof client.api.jobs.$post>;
type RequestType = InferRequestType<typeof client.api.jobs.$post>['json'];

export function useCreateJob() {
  const _queryClient = useQueryClient();

  const mutataion = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.jobs.$post({ json });

      return await response.json();
    },
    onSuccess() {
      console.log('Success');
    },
    onError() {
      console.log('Error');
    }
  });

  return mutataion;
}
