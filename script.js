function handleCredentialResponse(response) {
  const user = parseJwt(response.credential);
  const email = user.email;

  fetch('https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec', {
    method: 'POST',
    body: new URLSearchParams({ email })
  })
    .then(res => res.json())
    .then(data => {
      console.log('Fetched data:', data); // <— debug line
      if (data.length === 0) {
        document.getElementById('output').textContent = 'No data found for this email.';
      } else {
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
      }
    })
    .catch(err => {
      document.getElementById('output').textContent = 'Error fetching data.';
      console.error('Fetch error:', err);
    });
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(base64);
}
