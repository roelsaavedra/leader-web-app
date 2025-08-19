export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const { leaderId } = req.query;

  if (!leaderId) {
    return res.status(400).json({ error: 'Missing leaderId' });
  }

  try {
    const response = await fetch(`https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec?action=members&leaderId=${leaderId}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch from Apps Script' });
  }
}
