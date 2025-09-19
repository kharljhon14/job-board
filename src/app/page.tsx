import SearchJobForm from '@/features/homepage/search-job-form';
import JobCard from '@/features/job/job-card';

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <SearchJobForm />
      <div className="mt-4">
        <JobCard />
      </div>
    </div>
  );
}
