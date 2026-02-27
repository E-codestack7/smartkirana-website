/* ==============================
   SMART KIRANA TELEGRAM CHATBOT
   Clean Final Version
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const chatInput = document.getElementById("chatInput");
    const chatToggle = document.getElementById("chatToggle");

    if (chatToggle) {
        chatToggle.addEventListener("click", toggleChat);
    }

    if (chatInput) {
        chatInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                sendMessage();
            }
        });
    }

    renderFAQs();
});

/* ==============================
   TOGGLE CHAT
================================= */
function toggleChat() {
    const chatBox = document.getElementById("chatBox");
    if (!chatBox.dataset.loaded) {
    startAutoConversation();
    chatBox.dataset.loaded = "true";
}
    if (chatBox.style.display === "flex") {
        chatBox.style.display = "none";
    } else {
        chatBox.style.display = "flex";

        if (!chatBox.dataset.loaded) {
            startAutoConversation();
            chatBox.dataset.loaded = "true";
        }
    }
}

/* ==============================
   AUTO GREETING
================================= */
function startAutoConversation() {
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning ☀️";
    else if (hour < 17) greeting = "Good Afternoon 🌤️";
    else greeting = "Good Evening 🌙";

    autoBotMessage(`${greeting}! Welcome to Smart Kirana Assistant.`);
}


/* ==============================
   SEND MESSAGE
================================= */
function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    showTyping(() => {
        const reply = getBotResponse(message);
        addMessage(reply, "bot");
    });
}

/* ==============================
   ADD MESSAGE
================================= */
function addMessage(text, type) {
    const chatMessages = document.getElementById("chatMessages");

    const msgDiv = document.createElement("div");
    msgDiv.className = type === "bot" ? "bot-msg" : "user-msg";
    msgDiv.innerText = text;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ==============================
   AUTO BOT MESSAGE
================================= */
function autoBotMessage(text) {
    showTyping(() => {
        addMessage(text, "bot");
    });
}

/* ==============================
   TYPING ANIMATION
================================= */
function showTyping(callback) {
    const chatMessages = document.getElementById("chatMessages");

    const typingDiv = document.createElement("div");
    typingDiv.className = "typing-indicator";
    typingDiv.innerHTML = "<span></span><span></span><span></span>";

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typingDiv.remove();
        callback();
    }, 900);
}

/* ==============================
   KNOWLEDGE BASE (10 FAQs)
================================= */

const knowledgeBase = {

    "how to set up upi": "To set up UPI, install a UPI app, register your bank-linked mobile number, create UPI PIN and generate QR code.",

    "upi limit": "UPI transaction limit is generally ₹1,00,000 per day depending on your bank.",

    "security tips": "Never share OTP, UPI PIN or CVV. Always verify details before confirming transactions.",

    "failed transaction": "Most failed transactions are refunded within 5-7 working days.",

    "avoid fraud": "Never share OTP or PIN. Report fraud immediately to your bank and cybercrime.gov.in.",

    "accept payments": "Display your QR code. Customer scans and pays. Verify confirmation before handing goods.",

    "forgot upi pin": "Use 'Forgot UPI PIN' option in your app and verify using debit card details.",

    "app not working": "Check internet, update the app, restart phone or reinstall if necessary.",

    "which app best": "Google Pay, PhonePe, Paytm and BHIM are popular and reliable UPI apps.",

    "transaction charges": "UPI transactions are generally free for customers. Some merchant rules may vary.",

    "what is qr code": "A QR code allows customers to scan and pay directly to your bank account using any UPI app.",

    "how to generate qr code": "Open your UPI app, go to Receive Money section and download your personal QR code.",

    "how to check transaction history": "You can check transaction history inside your UPI app under 'Transactions' or 'Passbook' section.",

    "money not received": "If money is not received, check transaction status in app. Ask customer to share UTR number for verification.",

    "upi id": "UPI ID is your unique payment address like mobilenumber@bank or name@upi.",

    "can i use two upi apps": "Yes, you can use multiple UPI apps linked to the same bank account.",

    "daily limit": "Most banks allow ₹1,00,000 daily UPI limit. Check with your bank for exact limit.",

    "customer paid but not showing": "Ask customer to verify payment status. Sometimes it takes a few minutes to reflect in your app.",

    "how to block upi": "You can block your UPI service by contacting your bank or disabling UPI inside your app settings.",

    "is upi safe": "Yes, UPI is safe if you never share your PIN or OTP and always verify payment details."
};

/* ==============================
   BOT RESPONSE LOGIC
================================= */
function getBotResponse(message) {
    const msg = message.toLowerCase().trim();

    // Greeting response
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    return "Hello! 👋 Welcome to Smart Kirana Assistant. How can I help you today?";
}
    if (msg.includes("hru") || msg.includes ("how are you?")) {
        return "I am Good😊!! what about you, How can I help you today?";
    }
    if (msg.includes("upi") || msg.includes("UPI related")) {
        return "UPI, or Unified Payments Interface, is a real-time digital payment system that allows users to send money, pay bills, and manage accounts through a single app.";
    }
    if (msg.includes("what you can do") || msg.includes("how you can help me")) {
    return "I can help you with UPI setup, QR code generation, fraud prevention tips, transaction issues, daily limits, and digital payment safety for your kirana store.";
}
    if (msg.includes("thanks") || msg.includes("Thank you")) {
        return "You’re welcome!😇 If you have more questions, feel free to ask.";
    }
    

    // Check knowledge base
    for (let key in knowledgeBase) {
        if (msg.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // Default fallback
    return "Sorry! I can help you with UPI setup, security, fraud prevention, transaction limits and more.";
}


/* ==============================
   RENDER 10 FAQ BUTTONS
================================= */
function renderFAQs() {
    const faqContainer = document.getElementById("faqContainer");
    if (!faqContainer) return;

    faqContainer.innerHTML = "";

    Object.keys(knowledgeBase).forEach(question => {
        const btn = document.createElement("button");
        btn.className = "faq-btn";
        btn.innerText = question;
        btn.onclick = function () {
            document.getElementById("chatInput").value = question;
            sendMessage();
        };
        faqContainer.appendChild(btn);
    });
}
document.querySelectorAll(".faq-sidebar a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
    });
});
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", function () {

        const item = this.parentElement;

        // Close other open items
        document.querySelectorAll(".faq-item").forEach(faq => {
            if (faq !== item) {
                faq.classList.remove("active");
            }
        });

        // Toggle current
        item.classList.toggle("active");
    });
});


