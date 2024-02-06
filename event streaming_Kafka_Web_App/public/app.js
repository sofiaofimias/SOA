async function produceMessage() {
  const message = document.getElementById('message').value;
  if (message) {
      const response = await fetch('http://localhost:3000/produce', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
      });

      const result = await response.json();
      if (result.success) {
          alert(result.message);
      } else {
          alert(`Error: ${result.message}`);
      }
  }
}
