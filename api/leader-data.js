export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email in request' });
  }

  try {
    const params = new URLSearchParams({ email }).toString();

    const response = await fetch('https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    });

    const text = await response.text(); // Get raw response
    console.log('Raw response from Apps Script:', text);

    try {
      const data = JSON.parse(text); // Try parsing
      res.status(200).json(data);
    } catch (parseErr) {
      console.error('Failed to parse JSON:', parseErr);
      res.status(500).json({ error: 'Invalid JSON from backend', raw: text });
    }

  } catch (err) {
    console.error('Fetch to Apps Script failed:', err);
    res.status(500).json({ error: 'Failed to fetch from backend', detail: err.message });
  }
}
