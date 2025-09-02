import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUser, loginUser, logoutUser } from '../lib/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    const loggedInUser = await loginUser(credentials);
    setUser(loggedInUser);
    router.push('/'); // Redirect to home after login
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    router.push('/auth/login'); // Redirect to login after logout
  };

  return { user, loading, login, logout };
};

export default useAuth;