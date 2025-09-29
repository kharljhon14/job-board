'use client';

import { useAuth } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

import { useGetJob } from '@/features/jobs/api/use-get-job';
import { useUpdateJob } from '@/features/jobs/api/use-update-job';
import JobForm, { NewJobFormSchema } from '@/features/jobs/components/job-form';

export default function EditJobPage() {
  const { id } = useParams();
  const jobQuery = useGetJob(id?.toString());

  const auth = useAuth();

  const updateMutation = useUpdateJob(id?.toString());

  const onSubmit = (values: NewJobFormSchema) => {
    updateMutation.mutate(values);
  };

  if (jobQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (jobQuery.isError) {
    return <div>Something went wrong</div>;
  }

  if (jobQuery.isSuccess && jobQuery.data?.data.userId !== auth.userId) {
    return <div>404 Not Found</div>;
  }

  if (jobQuery.isSuccess) {
    return (
      <div>
        <JobForm
          onSubmit={onSubmit}
          id={id?.toString()}
          defaultValues={{
            title: jobQuery.data.data.title,
            description: jobQuery.data.data.description,
            salary: jobQuery.data.data.salary || '',
            status: jobQuery.data.data.status,
            type: jobQuery.data.data.type
          }}
        />
      </div>
    );
  }
}
