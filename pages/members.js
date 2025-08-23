import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MembersPage() {
  const { data: session, status } = useSession();

  // This shows a loading message while the session is being checked
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // This protects the page from unauthenticated users
  if (status === 'unauthenticated') {
    return (
      <div>
        <p>Access Denied. You must be signed in to view this page.</p>
        <Link href="/">Go to Homepage</Link>
      </div>
    );
  }

  // This is what shows if you are successfully logged in
  return (
    <div>
      <h1>Members Page</h1>
      <p>Welcome, {session.user.email}!</p>
      <p>If you can see this, the routing is working.</p>
      <Link href="/">Go back to Homepage</Link>
    </div>
  );
}
