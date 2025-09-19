import { Bell, Bookmark, MessageCircleMore, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';
export default function Header() {
  return (
    <header className="p-4 border-b flex items-center justify-between">
      <div className="relative w-24 h-8">
        <Link href="/">
          <Image
            src="/jobtayo.svg"
            alt="JobTayo Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <nav className="mr-auto ml-4">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>

      <div className="flex gap-x-2">
        <Button
          variant="ghost"
          size="icon"
        >
          <Bookmark />
        </Button>
        <Button
          variant="ghost"
          size="icon"
        >
          <MessageCircleMore />
        </Button>
        <Button
          variant="ghost"
          size="icon"
        >
          <Bell />
        </Button>
        <Button size="icon">
          <User />
        </Button>
      </div>
    </header>
  );
}
