import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { client } from '@/lib/hono';
import paths from '@/lib/path';

type ResponseType = InferResponseType<typeof client.api.jobs.$post>;
type RequestType = InferRequestType<typeof client.api.jobs.$post>['json'];

export function useCreateJob() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutataion = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.jobs.$post({ json });

      return await response.json();
    },
    onSuccess(data: ResponseType) {
      toast.success('Created Successfuly');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });

      if (data.success) router.push(paths.viewJobPath(data.data[0].id));
    }
  });

  return mutataion;
}
