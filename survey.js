/**
 * Survey Page JavaScript
 * 10 Quick Poll System
 * Multiple votes allowed
 */

// Initialize poll data
const pollData = {
    1: { yes: 142, no: 65 },
    2: { yes: 98, no: 76 },
    3: { yes: 120, no: 54 },
    4: { yes: 80, no: 40 },
    5: { yes: 95, no: 60 },
    6: { yes: 110, no: 35 },
    7: { frequently: 45, sometimes: 70, rarely: 30 },
    8: { yes: 85, no: 45, unsure: 30 },
    9: { yes: 100, no: 25 },
    10: { yes: 90, no: 50, partially: 40 }
};

document.addEventListener('DOMContentLoaded', function () {
    initializePolls();
});

/* ---------------------------
   Initialize Polls
---------------------------- */
function initializePolls() {
    document.querySelectorAll('.poll-option').forEach(button => {
        button.addEventListener('click', handlePollVote);
    });
}

/* ---------------------------
   Handle Vote
---------------------------- */
function handlePollVote(event) {

    const button = event.currentTarget;
    const pollId = button.getAttribute('data-poll');
    const option = button.getAttribute('data-option');

    if (!pollData[pollId]) return;

    // Increment vote
    if (!pollData[pollId][option]) {
        pollData[pollId][option] = 0;
    }
    pollData[pollId][option]++;

    // Highlight selected button
    const pollCard = document.getElementById(`poll${pollId}`);
    pollCard.querySelectorAll('.poll-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');

    showPollResults(pollId);
    showNotification('Thank you for your vote!', 'success');
}

/* ---------------------------
   Show Results
---------------------------- */
function showPollResults(pollId) {

    const pollCard = document.getElementById(`poll${pollId}`);
    if (!pollCard) return;

    const resultsContainer = pollCard.querySelector('.poll-results');
    if (!resultsContainer) return;

    resultsContainer.style.display = 'block';

    const data = pollData[pollId];
    const total = Object.values(data).reduce((a, b) => a + b, 0);

    const totalSpan = resultsContainer.querySelector(`[data-total="${pollId}"]`);
    if (totalSpan) totalSpan.textContent = total;

    // Update ALL options dynamically
    Object.keys(data).forEach(option => {
        const percent = total ? Math.round((data[option] / total) * 100) : 0;

        const fill = resultsContainer.querySelector(`[data-result="${option}"]`);
        const text = resultsContainer.querySelector(`[data-percent="${option}"]`);

        if (fill) setTimeout(() => fill.style.width = percent + '%', 100);
        if (text) text.textContent = percent + '%';
    });
}

/* ---------------------------
   Notification System
---------------------------- */
function showNotification(message, type = 'success') {

    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ---------------------------
   Animation Styles
---------------------------- */
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
}
.poll-option.selected {
    background: var(--primary-color) !important;
    color: white !important;
    border-color: var(--primary-color) !important;
    transform: scale(1.05);
}
`;
document.head.appendChild(style);

/* ---------------------------
   Update Engagement Stats
---------------------------- */
function updateStats() {

    let totalVotes = 0;
    Object.values(pollData).forEach(poll => {
        totalVotes += Object.values(poll).reduce((a, b) => a + b, 0);
    });

    const pollVotesEl = document.getElementById("pollVotes");
    if (pollVotesEl) pollVotesEl.textContent = totalVotes;

    const feedbackEl = document.getElementById("feedbackCount");
    if (feedbackEl) feedbackEl.textContent = Math.floor(totalVotes / 2);
}

document.addEventListener("DOMContentLoaded", updateStats);