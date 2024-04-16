import { createViewerToken } from '@/actions/token';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken.sub;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    };
    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
