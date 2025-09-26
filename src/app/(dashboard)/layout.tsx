import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <div className="container mx-auto px-4 mt-10">{children}</div>;
}
