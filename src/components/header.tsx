'use client';

import { useAuth, useClerk } from '@clerk/nextjs';
import { Bell, Bookmark, MessageCircleMore, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import paths from '@/lib/path';

import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
export default function Header() {
  const auth = useAuth();
  const { signOut } = useClerk();

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

      {auth?.userId && (
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
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon">
                <User />
              </Button>
            </PopoverTrigger>
            <PopoverContent asChild>
              <div className="flex flex-col gap-3 w-[10rem] items-center justify-center">
                <Link href={paths.viewProfilePath(auth.userId)}>Profile</Link>
                <Link href={paths.viewProfilePath(auth.userId)}>My Jobs</Link>

                <Button onClick={() => signOut({ redirectUrl: paths.homePath() })}>Sign out</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </header>
  );
}
