'use client';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { ChatInfo } from './chat-info';

interface ChatFormProps {
  onSubmit: () => void;
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
  isFollowing: boolean;
}

export const ChatForm = ({
  isChatDelayed,
  isChatFollowersOnly,
  isFollowing,
  isHidden,
  onChange,
  onSubmit,
  value,
}: ChatFormProps) => {
  const [isDelayBlocked, setIsDelayBlocked] = useState(false);
  const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      className='flex flex-col items-center gap-y-4 p-3'
      onSubmit={handleSubmit}
    >
      <div className='w-full'>
        <ChatInfo
          isDelayed={isChatDelayed}
          isFollowersOnly={isChatFollowersOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder='Send a message'
          className={cn(
            'border-white/10',
            isChatFollowersOnly ||
              (isChatDelayed && 'rounded-t-none border-t-0')
          )}
        />
      </div>
      <div className='ml-auto'>
        <Button type='submit' variant='primary' size='sm' disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-y-4 p-3'>
      <Skeleton className='w-full h-10' />
      <div className='flex items-center gap-x-2 ml-auto'>
        <Skeleton className='h-7 w-7' />
        <Skeleton className='h-7 w-12' />
      </div>
    </div>
  );
};
