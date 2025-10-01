'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Job } from '@/types/job';

import JobCard from './job-card';

interface Props {
  jobs: Job[];
  isLoading: boolean;
}

export default function JobsContainer({ jobs, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <Skeleton className="h-[20px] w-[10rem] rounded-xl" />
              <Skeleton className="h-[20px] w-[3rem] rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-[20px] w-[8rem] rounded-xl" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[5rem] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-[20px] w-[5rem] rounded-xl" />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <Skeleton className="h-[20px] w-[10rem] rounded-xl" />
              <Skeleton className="h-[20px] w-[3rem] rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-[20px] w-[8rem] rounded-xl" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[5rem] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-[20px] w-[5rem] rounded-xl" />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <Skeleton className="h-[20px] w-[10rem] rounded-xl" />
              <Skeleton className="h-[20px] w-[3rem] rounded-xl" />
            </div>
            <div>
              <Skeleton className="h-[20px] w-[8rem] rounded-xl" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[5rem] w-full rounded-xl" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-[20px] w-[5rem] rounded-xl" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  );
}
