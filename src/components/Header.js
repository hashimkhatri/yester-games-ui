"use client";
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </header>
  );
}
