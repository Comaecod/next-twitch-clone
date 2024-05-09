import { getSelf } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { ToggleCard, ToggleCardProps } from './_components/toggle-card';

/* interface ExtendedToggleCardProps extends ToggleCardProps {
  key: string;
} */

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error('Stream not found');
  }

  /* const settings: ExtendedToggleCardProps[] = [
    {
      key: 'isChatEnabled',
      field: 'isChatEnabled',
      label: 'Enable Chat',
      value: stream.isChatEnabled,
    },
    {
      key: 'isChatDelayed',
      field: 'isChatDelayed',
      label: 'Delay Chat',
      value: stream.isChatDelayed,
    },
    {
      key: 'isChatFollowersOnly',
      field: 'isChatFollowersOnly',
      label: 'Must be following to chat',
      value: stream.isChatFollowersOnly,
    },
  ]; */

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>Chat Settings</h1>
      </div>
      <div className='space-y-4'>
        {/* {settings.map((setting) => (
          <ToggleCard {...setting} key={setting.key} />
        ))} */}
        <ToggleCard
          field='isChatEnabled'
          label='Enable Chat'
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field='isChatDelayed'
          label='Delay Chat'
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field='isChatFollowersOnly'
          label='Must be following to chat'
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
