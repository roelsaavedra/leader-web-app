import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MembersPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <p>Access Denied. You must be signed in to view this page.</p>
        <Link href="/">Go to Homepage</Link>
      </div>
    );
  }

  // This block is now safer and includes debugging info
  return (
    <div>
      {/* The '?.' is called "optional chaining". It prevents crashes. */}
      <h1>Welcome, {session?.user?.email || 'User'}!</h1>
      <p>If you can see this, the page is working.</p>
      <Link href="/">Go back to Homepage</Link>

      <hr />
      <h2>Debugging Information:</h2>
      <p>This is the content of your session object:</p>
      <pre style={{ background: '#eee', padding: '1rem', borderRadius: '5px' }}>
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
