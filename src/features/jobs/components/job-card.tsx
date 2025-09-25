import { CircleDollarSign } from 'lucide-react';
import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Job } from '@/types/job';

interface Props {
  job: Job;
}

export default function JobCard({ job }: Props) {
  return (
    <Link href="/">
      <Card className=" hover:shadow-md transition-all duration-100">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>{job.title}</p>
            <Badge>{job.type}</Badge>
          </CardTitle>
          {job.salary && (
            <CardDescription>
              <div className="flex gap-x-2 items-center">
                <CircleDollarSign />
                <p>{job.salary}</p>
              </div>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className=" prose line-clamp-4">
          <Markdown remarkPlugins={[remarkGfm]}>{job.description}</Markdown>
        </CardContent>
        <CardFooter>{job.createdAt}</CardFooter>
      </Card>
    </Link>
  );
}
