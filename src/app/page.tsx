import SearchJobForm from '@/features/homepage/search-job-form';
import JobsContainer from '@/features/jobs/components/jobs-container';

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <SearchJobForm />
      <div className="mt-4">
        <JobsContainer />
      </div>
    </div>
  );
}
