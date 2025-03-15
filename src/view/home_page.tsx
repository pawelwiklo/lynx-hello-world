import { useCallback, useEffect, useState } from '@lynx-js/react'

import '../App.css'
import type { User } from '../model/user.jsx'

export function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchUsers = async (pageNum: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${pageNum}`);
      const data = await response.json();

      setUsers((prevUsers) => [...prevUsers, ...data.data]);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.2 && !loading) {
      setPage((prevPage) => (prevPage === 1 ? 2 : 1));
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <scroll-view
      onScroll={handleScroll}
      scrollY
      style={{ height: '100vh', backgroundColor: '#121212', color: '#fff', padding: '20px' }}
    >
      {users.map((user) => (
        <view key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', backgroundColor: '#2a2a2a', marginBottom: '10px' }}>
          <image src={user.avatar} style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #fff' }} />
          <view style={{ display: 'flex', flexDirection: 'column' }}>
            <text style={{ fontSize: '16px', fontWeight: 'bold' }}>{user.first_name} {user.last_name}</text>
            <text style={{ fontSize: '14px', color: '#bbb' }}>{user.email}</text>
          </view>
        </view>
      ))}
      {loading && <text style={{ marginTop: '10px', color: '#bbb' }}>Loading more users...</text>}
    </scroll-view>
  );
}
