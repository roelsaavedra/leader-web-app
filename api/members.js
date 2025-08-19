export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const { leaderId } = req.query;

  if (!leaderId) {
    return res.status(400).json({ error: 'Missing leaderId' });
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec?action=members&leaderId=${encodeURIComponent(leaderId)}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
}
