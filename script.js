

// Toggle Menu for Mobile View
const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('.nav-list');

// Toggle navigation menu visibility on clicking the hamburger icon
menuIcon.addEventListener('click', () => {
  navList.classList.toggle('active');  // Toggle the 'active' class to show/hide the menu
});

// Search functionality (temporary for demonstration)
const searchForm = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-box input');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const query = searchInput.value.trim();
  if (query) {
    alert(`You searched for: ${query}`); // Display an alert with the search term (basic functionality)
    searchInput.value = ''; // Clear the search box after search
  } else {
    alert('Please enter a search term.');
  }
});

// Smooth scroll for anchor links (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1); // Get the target section ID
    const targetElement = document.getElementById(targetId);

    // Smoothly scroll to the target element
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
