import { quotes } from './quotes.js';

let currentQuote = null;

// Sidebar functionality
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const closeSidebar = document.getElementById('closeSidebar');

// Open sidebar
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

// Close sidebar
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when clicking overlay
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
});

// Get active categories based on toggles
function getActiveCategories() {
    const categories = [];
    if (document.getElementById('toggle-christmas').checked) categories.push('A Christmas Carol');
    if (document.getElementById('toggle-inspector').checked) categories.push('An Inspector Calls');
    if (document.getElementById('toggle-macbeth').checked) categories.push('Macbeth');
    if (document.getElementById('toggle-poetry').checked) categories.push('Poetry');
    return categories;
}

// Filter quotes by active categories
function getFilteredQuotes() {
    const activeCategories = getActiveCategories();
    if (activeCategories.length === 0) {
        return quotes; // If nothing selected, show all
    }
    return quotes.filter(quote => activeCategories.includes(quote.source[0]));
}

// Remove approximately 1/3 of random words
function removeRandomWords(text) {
    const words = text.split(' ');
    const numToRemove = Math.round(words.length / 3);
    
    // Create array of indices to potentially remove
    const indices = Array.from({length: words.length}, (_, i) => i);
    
    // Shuffle and take the first numToRemove indices
    const indicesToRemove = indices
        .sort(() => Math.random() - 0.5)
        .slice(0, numToRemove);
    
    // Create new array with blanks
    const result = words.map((word, index) => {
        return indicesToRemove.includes(index) ? '__' : word;
    });
    
    return result.join(' ');
}

// Load a new random quote
function loadNewQuote() {
    const filteredQuotes = getFilteredQuotes();
    
    if (filteredQuotes.length === 0) {
        alert('Please select at least one category!');
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    
    // Wait for card to flip back before updating content
    const card = document.getElementById('card');
    
    if (card.classList.contains('flipped')) {
        // Card is flipped, so flip it back first
        card.classList.remove('flipped');
        
        // Wait for flip animation to complete (700ms) before updating
        setTimeout(() => {
            updateQuoteContent();
        }, 700);
    } else {
        // Card is already showing front, update immediately
        updateQuoteContent();
    }
}

function updateQuoteContent() {
    // Update the hidden quote (front of card)
    document.getElementById('hiddenQuote').textContent = '"' + removeRandomWords(currentQuote.text) + '"';
    
    // Update the full quote (back of card)
    document.getElementById('fullQuote').textContent = '"' + currentQuote.text + '"';
    document.getElementById('quoteSource').textContent = '— ' + currentQuote.source[0] + ', ' + currentQuote.source[1] + ", " + currentQuote.source[2];
}

// Reveal button - flip to back
document.getElementById('revealBtn').addEventListener('click', function() {
    document.getElementById('card').classList.add('flipped');
});

// New quote button - load new quote
document.getElementById('newQuoteBtn').addEventListener('click', function() {
    loadNewQuote();
});

// Load initial quote on page load
window.addEventListener('DOMContentLoaded', function() {
    loadNewQuote();
});