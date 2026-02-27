/**
 * Contact Form Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ✅ Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // ✅ QR Code - clear first to prevent double generation
    const qrElement = document.getElementById("qrcode");
    if (qrElement) {
        qrElement.innerHTML = "";  // Clear any existing QR
        new QRCode(qrElement, {
            text: "https://scan.page/jAu4Ot",
            width: 180,
            height: 180,
            colorDark: "#3b3b7a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
});

function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading
    showLoadingNotification();

    // Simulate sending message
    setTimeout(() => {
        hideLoadingNotification();
        showSuccessNotification();
        document.getElementById('contactForm').reset();
    }, 1500);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

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
        <span>Sending your message...</span>
    `;

    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
}

function hideLoadingNotification() {
    const notification = document.getElementById('loadingNotification');
    if (notification) {
        notification.remove();
    }
}

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
                <strong>Message Sent Successfully!</strong>
                <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">We'll respond to you within 24-48 hours.</p>
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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