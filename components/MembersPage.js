// components/MembersPage.js

"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MembersPage() {
  const { data: session, status } = useSession();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchMembers = async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    try {
      // Show progress via page
      console.log("STEP 1: Fetching leader-data...");
      const leaderRes = await fetch("/api/leader-data", {
        method: "POST",
        body: new URLSearchParams({ email: session.user.email }),
      });

      const leaderData = await leaderRes.json();
      const leaderId = leaderData?.[0]?.[1];

      // Temporary way to display what's going on
      document.body.innerHTML += `<pre>Leader ID: ${leaderId}</pre>`;

      if (!leaderId) {
        document.body.innerHTML += `<pre>No leader ID found.</pre>`;
        setLoading(false);
        return;
      }

      // STEP 2: Fetch members
      document.body.innerHTML += `<pre>Fetching members for ${leaderId}...</pre>`;
      const membersRes = await fetch(`/api/members?leaderId=${leaderId}`);
      const membersJson = await membersRes.json();

      document.body.innerHTML += `<pre>Members: ${JSON.stringify(membersJson.rows || [], null, 2)}</pre>`;

      setMembers(membersJson.rows || []);
    } catch (err) {
      document.body.innerHTML += `<pre>ERROR: ${err.message}</pre>`;
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, [session]);

  if (status === "loading" || loading) return <p>Loading...</p>;

  if (!session) {
    return (
      <div>
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
