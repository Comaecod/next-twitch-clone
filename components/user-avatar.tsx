import { type VariantProps, cva } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { LiveBadge } from './live-badge';
import { Skeleton } from './ui/skeleton';

const avatarSizes = cva('', {
  variants: {
    size: {
      default: 'h-8 w-8',
      lg: 'h-14 w-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

export const UserAvatar = ({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className='relative'>
      <Avatar
        className={cn(
          isLive && 'ring-2 ring-rose-500 border border-background',
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className='object-cover' />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
        {canShowBadge && (
          <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
            <LiveBadge />
          </div>
        )}
      </Avatar>
    </div>
  );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
};
