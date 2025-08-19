// TEMPORARY: Hardcoded email for testing
const email = "roel.saavedra@everynationcampus.org"; // Replace this with your actual email

fetch('https://script.google.com/macros/s/AKfycbwHEFqfhJTT0JeZCihn_PKXZQUmaw4fVBxtMTWknwXKeGOJ9D9yNufxaiConuc0jJFTGQ/exec', {
  method: 'POST',
  body: new URLSearchParams({ email })
})
  .then(res => res.json())
  .then(data => {
    console.log('Fetched data:', data);
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
