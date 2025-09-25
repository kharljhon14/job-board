import { CircleDollarSign } from 'lucide-react';

interface Props {
  salary?: string | null;
}

export default function JobSalary({ salary }: Props) {
  return (
    <div className="flex gap-x-2 items-center">
      <CircleDollarSign />
      <p>{salary}</p>
    </div>
  );
}
