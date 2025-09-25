import { Badge } from '@/components/ui/badge';
import { JobType } from '@/types/job';

const jobTypeMap = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  gig: 'Gig',
  any: 'Any'
};

interface Props {
  jobType: JobType;
}

export default function JobTypeBadge({ jobType }: Props) {
  return <Badge>{jobTypeMap[jobType]}</Badge>;
}
