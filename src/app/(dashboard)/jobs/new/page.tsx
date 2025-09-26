import JobForm from '@/features/jobs/components/job-form';

export default function NewJobPage() {
  return (
    <div>
      <JobForm
        defaultValues={{ title: '', description: '', type: 'any', status: 'draft', salary: '' }}
      />
    </div>
  );
}
