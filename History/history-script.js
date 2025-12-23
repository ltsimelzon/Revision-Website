import { questions } from './questions.js';

let currentQuestion = null;

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

// Get active topics based on toggles
function getActiveTopics() {
    const topics = [];
    if (document.getElementById('toggle-america').checked) topics.push('Making of America');
    if (document.getElementById('toggle-nazi').checked) topics.push('Nazi Germany');
    if (document.getElementById('toggle-crime').checked) topics.push('Crime & Punishment');
    if (document.getElementById('toggle-elizabethan').checked) topics.push('Elizabethan England');
    return topics;
}

// Filter questions by active topics
function getFilteredQuestions() {
    const activeTopics = getActiveTopics();
    if (activeTopics.length === 0) {
        return questions; // If nothing selected, show all
    }
    return questions.filter(q => activeTopics.includes(q.subject[0]));
}

// Load a new random question
function loadNewQuestion() {
    const filteredQuestions = getFilteredQuestions();
    
    if (filteredQuestions.length === 0) {
        alert('Please select at least one topic!');
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    currentQuestion = filteredQuestions[randomIndex];
    
    // Wait for card to flip back before updating content
    const card = document.getElementById('card');
    
    if (card.classList.contains('flipped')) {
        // Card is flipped, so flip it back first
        card.classList.remove('flipped');
        
        // Wait for flip animation to complete (700ms) before updating
        setTimeout(() => {
            updateQuestionContent();
        }, 700);
    } else {
        // Card is already showing front, update immediately
        updateQuestionContent();
    }
}

function updateQuestionContent() {
    // Update the question on front of card
    document.getElementById('questionText').textContent = currentQuestion.question;
    
    // Update the answer and source on back of card
    document.getElementById('answerText').textContent = currentQuestion.answer;
    
    // Show topic and subtopic information
    const sourceText = currentQuestion.subject[0] + 
                      (currentQuestion.subject[1] ? ' - ' + currentQuestion.subject[1] : '');
    document.getElementById('questionSource').textContent = sourceText;
}

// Reveal button - flip to back
document.getElementById('revealBtn').addEventListener('click', function() {
    document.getElementById('card').classList.add('flipped');
});

// New question button - load new question
document.getElementById('newQuestionBtn').addEventListener('click', function() {
    loadNewQuestion();
});

// Load initial question on page load
window.addEventListener('DOMContentLoaded', function() {
    loadNewQuestion();
});