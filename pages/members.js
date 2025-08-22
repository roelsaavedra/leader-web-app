// pages/members.js try to commit this please

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MembersPage() {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!session?.user?.email) return;

      try {
        // Step 1: Get leaderId using the user's email
        const leaderRes = await fetch("/api/leader-data", {
          method: "POST",
          body: new URLSearchParams({ email: session.user.email }),
        });
        const leaderData = await leaderRes.json();
        const leaderId = leaderData?.[0]?.[1]; // Assumes leader ID is in the second column

        if (!leaderId) {
          setLoading(false);
          return;
        }

        // Step 2: Fetch members by leaderId
        const membersRes = await fetch(`/api/members?leaderId=${leaderId}`);
        const membersJson = await membersRes.json();

        setMembers(membersJson.rows || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [session]);

  if (status === "loading" || loading) return <p>Loading...</p>;

  if (!session) {
    return (
      <div style={{ padding: "20px" }}>
        <p>You must be signed in to view this page.</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {session.user.name || "Leader"} 👋</h2>
      <h3>Your Members</h3>

      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Group ID</th>
              <th>Campus ID</th>
              <th>Year Level</th>
              <th>Status</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member[1]}>
                <td>{member[2]}</td>
                <td>{member[3]}</td>
                <td>{member[4]}</td>
                <td>{member[5]}</td>
                <td>{member[6]}</td>
                <td>{member[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
