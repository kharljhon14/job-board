'use client';

import { useParams } from 'next/navigation';

import { useGetJob } from '@/features/jobs/api/use-get-job';
import JobForm from '@/features/jobs/components/job-form';

export default function EditJobPage() {
  const { id } = useParams();
  const jobQuery = useGetJob(id?.toString());

  return (
    <div>
      <JobForm />
    </div>
  );
}
