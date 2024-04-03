'use server';

import { followUser, unFollowUser } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath('/');

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error('Internal Error');
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unFollowedUser = await unFollowUser(id);

    revalidatePath('/');

    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`);
    }

    return unFollowedUser;
  } catch (error) {
    throw new Error('Internal Error');
  }
};
