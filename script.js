function handleCredentialResponse(response) {
  const user = parseJwt(response.credential);
  const email = user.email;

  // Call your Apps Script backend
  fetch('https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec', {
    method: 'POST',
    body: new URLSearchParams({ email })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('output').textContent =
        data.length === 0
          ? 'No data found for this email.'
          : JSON.stringify(data, null, 2);
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error fetching data.';
      console.error(err);
    });
}

// Helper to decode JWT from Google Sign-In
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(base64);
}
