'use client';

import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

import SearchJobForm from '@/features/homepage/search-job-form';
import { useGetJobs } from '@/features/jobs/api/use-get-jobs';
import JobsContainer from '@/features/jobs/components/jobs-container';

export default function ProfilePage() {
  const auth = useAuth();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchOnSubmit = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const jobsQuery = useGetJobs({ searchParam: searchValue, userId: auth.userId ?? '' });

  return (
    <div className="container mx-auto ">
      <SearchJobForm handleSearchOnSubmit={handleSearchOnSubmit} />

      <div className="mt-4">
        <JobsContainer
          jobs={jobsQuery.data?.data || []}
          isLoading={jobsQuery.isLoading}
        />
      </div>
    </div>
  );
}
