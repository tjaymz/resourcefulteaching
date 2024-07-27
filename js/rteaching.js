// Function to handle navigation and content loading
function showPage(pageName) {
    // 1. Fetch content for the selected page
    fetch(`views/${pageName}.html`) // Assuming each page has its own HTML file
      .then(response => response.text())
      .then(html => {
        // 2. Update the main content area
        document.getElementById('mainContent').innerHTML = html;
  
        // 3. Update active link in navigation
        document.querySelectorAll('#navLinks a').forEach(link => link.classList.remove('active'));
        document.querySelector(`#navLinks a[data-page="${pageName}"]`).classList.add('active');
      });
  }
  
  // Event listeners for navigation links
  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      const pageName = link.getAttribute('data-page');
      showPage(pageName);
    });
  });
  
  // Initial page load (show the home page)
  showPage('home');
  