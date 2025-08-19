import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function MembersPage() {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      fetch('/api/leader-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      })
        .then((res) => res.json())
        .then((leaderData) => {
          const leaderId = leaderData[0]?.[1]; // Assuming leader ID is column B
          if (!leaderId) throw new Error('Leader ID not found');

          return fetch(`/api/members?leaderId=${leaderId}`);
        })
        .then((res) => res.json())
        .then((data) => {
          setMembers(data.rows || []);
        })
        .catch((err) => {
          console.error('Error fetching members:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [session, status]);

  if (loading) return <p>Loading members...</p>;
  if (!session) return <p>Please sign in to view members.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Members</h2>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Year Level</th>
              <th>Status</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {members.map((row, i) => (
              <tr key={i}>
                <td>{row[2]}</td> {/* Name */}
                <td>{row[5]}</td> {/* Year Level */}
                <td>{row[6]}</td> {/* Status */}
                <td>{row[7]}</td> {/* Attendance */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
