/**
 * Community Forum JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form
    const form = document.querySelector('.share-form');
    if (form) {
        // Add form event listeners
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
});

// Validate individual field
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = '#ef4444';
        return false;
    } else {
        field.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        return true;
    }
}

// Submit post function
function submitPost() {
    const name = document.getElementById('postName').value.trim();
    const category = document.getElementById('postCategory').value;
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    // Validate all fields
    let isValid = true;
    const fields = ['postName', 'postCategory', 'postTitle', 'postContent'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Simulate post submission
    showLoadingNotification();

    setTimeout(() => {
        hideLoadingNotification();
        showSuccessNotification();
        clearForm();
    }, 1500);
}

// Clear form
function clearForm() {
    document.getElementById('postName').value = '';
    document.getElementById('postCategory').value = '';
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
}

// Show loading notification
function showLoadingNotification() {
    const notification = document.createElement('div');
    notification.id = 'loadingNotification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(79, 70, 229, 0.95);
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    notification.innerHTML = `
        <div class="spinner" style="
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <span>Posting your message...</span>
    `;

    document.body.appendChild(notification);

    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Hide loading notification
function hideLoadingNotification() {
    const notification = document.getElementById('loadingNotification');
    if (notification) {
        notification.remove();
    }
}

// Show success notification
function showSuccessNotification() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.5rem 2rem;
        background: rgba(16, 185, 129, 0.95);
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <strong>Post Submitted Successfully!</strong>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">Your post will appear in the forum shortly.</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
