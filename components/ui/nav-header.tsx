'use client';

import { useSession, signOut } from 'next-auth/react';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Button } from './button';
import { AvatarIcon } from '@radix-ui/react-icons';

export default function NavHeader() {
  const session = useSession();

  async function handleLogout() {
    await signOut({ callbackUrl: '/login' });
  }

  return (
    <>
      <div className="fixed top-0 w-full bg-primary text-white h-12 mx-auto px-6 flex items-center justify-between">
        <div>My App</div>
        {session.data?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar asChild>
                <AvatarIcon className="cursor-pointer w-8 h-8" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black">
              <DropdownMenuItem>
                <Button variant="link" onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
}
