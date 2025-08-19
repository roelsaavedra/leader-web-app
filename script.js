function handleCredentialResponse(response) {
  const user = parseJwt(response.credential);
  const email = user.email;

  fetch('/api/leader-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById('output').textContent = 'No data found for this email.';
      } else {
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error fetching data.';
      console.error('Frontend fetch error:', err);
    });
}
