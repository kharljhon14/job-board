import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { client } from '@/lib/hono';
import paths from '@/lib/path';

type ResponseType = InferResponseType<(typeof client.api.jobs)[':id']['$patch']>;
type RequestType = InferRequestType<(typeof client.api.jobs)[':id']['$patch']>['json'];

export function useUpdateJob(id?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutataion = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.jobs[':id']['$patch']({ param: { id: id || '' }, json });

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Updated Successfuly');
      queryClient.invalidateQueries({ queryKey: ['job', { id }] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      router.push(paths.viewJobPath(id?.toString() || ''));
    }
  });

  return mutataion;
}
