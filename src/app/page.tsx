import Link from 'next/link';

import { Button } from '@/components/ui/button';
import SearchJobForm from '@/features/homepage/search-job-form';
import JobsContainer from '@/features/jobs/components/jobs-container';
import paths from '@/lib/path';

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <SearchJobForm />
      <Link href={paths.createJobPath()}>
        <Button>Create Job</Button>
      </Link>
      <div className="mt-4">
        <JobsContainer />
      </div>
    </div>
  );
}
