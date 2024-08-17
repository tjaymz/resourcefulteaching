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

      // 4. Special handling for the video page
      if (pageName === 'video') {
        loadVideos();
      }

      // 5. Update the URL hash
      window.location.hash = pageName;
    });
}

// Function to load videos dynamically
function loadVideos() {
  fetch('js/resourceful.json')
    .then(response => response.json())
    .then(data => {
      const videoContainer = document.getElementById('myVideos');
      videoContainer.innerHTML = ''; // Clear previous videos

      data.videoIds.forEach(videoId => {
        const iframe = createYoutubeIframe(videoId); // Function to create iframes
        videoContainer.appendChild(iframe);
      });
    });
}

function createYoutubeIframe(videoId) {
  const iframe = document.createElement('iframe');
  iframe.width = "355";
  iframe.height = "200";
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.title = "YouTube video player";
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  iframe.allowFullscreen = true;
  return iframe;
}

// Event listeners for navigation links
document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const pageName = link.getAttribute('data-page');
    showPage(pageName);
  });
});

// Load the page based on the current hash or default to home
window.addEventListener('load', () => {
  const initialPage = window.location.hash.substring(1) || 'home';
  showPage(initialPage);
});

// Handle hash change for direct navigation via URL
window.addEventListener('hashchange', () => {
  const pageName = window.location.hash.substring(1);
  showPage(pageName);
});
