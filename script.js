g// Toggle Menu for Mobile View
const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('.nav-list');

// Toggle navigation menu visibility on clicking the hamburger icon
menuIcon.addEventListener('click', () => {
  navList.classList.toggle('active');  // Toggle the 'active' class to show/hide the menu
});

// Search functionality
const searchForm = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-box input');
const recipeCards = document.querySelectorAll('.recipe-card');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  performSearch();
});

// Also search while typing (optional)
searchInput.addEventListener('input', performSearch);

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let hasVisibleCards = false;
  
  recipeCards.forEach(card => {
    const title = card.querySelector('h2').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    
    // Check if the search term matches either title or description
    const matches = title.includes(searchTerm) || description.includes(searchTerm);
    
    // Show/hide the card based on match
    if (matches || searchTerm === '') {
      card.style.display = 'block';
      hasVisibleCards = true;
    } else {
      card.style.display = 'none';
    }
  });

  // Show message if no results found
  const noResultsMsg = document.querySelector('.no-results-message');
  
  if (!hasVisibleCards && searchTerm !== '') {
    if (!noResultsMsg) {
      const message = document.createElement('p');
      message.className = 'no-results-message';
      message.textContent = 'No recipes found matching your search.';
      message.style.textAlign = 'center';
      message.style.padding = '20px';
      message.style.color = '#666';
      
      const recipesSection = document.querySelector('.recipes');
      recipesSection.insertBefore(message, recipesSection.querySelector('.recipe-section'));
    }
  } else {
    if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }
}

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

const searchBox = document.querySelector('.search-box');
const suggestionsContainer = document.querySelector('.search-suggestions');

// Get all recipe titles for suggestions
const recipeTitles = Array.from(recipeCards).map(card => 
  card.querySelector('h2').textContent
);

// Function to show suggestions
function showSuggestions(inputValue) {
  const suggestions = recipeTitles.filter(title =>
    title.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (inputValue === '' || suggestions.length === 0) {
    suggestionsContainer.style.display = 'none';
    return;
  }

  suggestionsContainer.innerHTML = suggestions
    .map(title => `<div class="suggestion-item">${title}</div>`)
    .join('');
  
  suggestionsContainer.style.display = 'block';
}

// Handle suggestion clicks
suggestionsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('suggestion-item')) {
    searchInput.value = e.target.textContent;
    suggestionsContainer.style.display = 'none';
    performSearch();
  }
});

// Update input event listener to show suggestions
searchInput.addEventListener('input', (e) => {
  showSuggestions(e.target.value);
  performSearch();
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target)) {
    suggestionsContainer.style.display = 'none';
  }
});

// Handle keyboard navigation
searchInput.addEventListener('keydown', (e) => {
  const items = suggestionsContainer.querySelectorAll('.suggestion-item');
  const activeItem = suggestionsContainer.querySelector('.suggestion-item.active');
  
  if (items.length === 0) return;

  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    
    if (!activeItem) {
      items[e.key === 'ArrowDown' ? 0 : items.length - 1].classList.add('active');
      return;
    }

    activeItem.classList.remove('active');
    
    if (e.key === 'ArrowDown') {
      const nextItem = activeItem.nextElementSibling;
      if (nextItem) {
        nextItem.classList.add('active');
      } else {
        items[0].classList.add('active');
      }
    } else {
      const prevItem = activeItem.previousElementSibling;
      if (prevItem) {
        prevItem.classList.add('active');
      } else {
        items[items.length - 1].classList.add('active');
      }
    }
  } else if (e.key === 'Enter' && activeItem) {
    e.preventDefault();
    searchInput.value = activeItem.textContent;
    suggestionsContainer.style.display = 'none';
    performSearch();
  }
});
