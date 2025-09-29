'use client';

import { useCreateJob } from '@/features/jobs/api/use-create-job';
import JobForm, { NewJobFormSchema } from '@/features/jobs/components/job-form';

export default function NewJobPage() {
  const createMutation = useCreateJob();

  const onSubmit = (values: NewJobFormSchema) => {
    createMutation.mutate(values);
  };

  return (
    <div>
      <JobForm
        onSubmit={onSubmit}
        defaultValues={{ title: '', description: '', type: 'any', status: 'draft', salary: '' }}
      />
    </div>
  );
}
