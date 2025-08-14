const container = document.getElementById('userData');
const reloadBtn = document.getElementById('reloadBtn');
const loader = document.getElementById('loader');

async function fetchData() {
  container.innerHTML = "";
  showLoader(true);

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    container.innerHTML = `<p class="error-message">Oops! Something went wrong. Please check your internet connection or try again later.</p>`;
    console.error('Fetch error:', error);
  } finally {
    showLoader(false);
  }
}

function displayData(users) {
  users.forEach(user => {
    const div = document.createElement('div');
    div.classList.add('user-card');
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    `;
    container.appendChild(div);
  });
}

function showLoader(visible) {
  loader.style.display = visible ? "block" : "none";
}

reloadBtn.addEventListener('click', fetchData);

fetchData();
