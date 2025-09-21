import SearchJobForm from '@/features/homepage/search-job-form';
import JobCard from '@/features/job/job-card';
import JobForm from '@/features/jobs/job-form';

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <SearchJobForm />
      <div className="mt-4">
        <JobCard />
        <JobForm />
      </div>
    </div>
  );
}
