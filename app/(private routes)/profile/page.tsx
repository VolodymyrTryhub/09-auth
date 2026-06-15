'use client';

import { useEffect, useState } from 'react';

import { getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <main>
      <h1>Profile</h1>

      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </main>
  );
}
