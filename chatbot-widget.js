/**
 * Smart Kirana Assistant — Premium Purple Chatbot
 */

(function () {
    'use strict';

    if (document.getElementById('kirana-widget')) return;

    const BOT_NAME = "Smart Kirana Assistant";
   const BOT_AVATAR = "🤖";

    const knowledgeBase = {
        "upi limit": "UPI transaction limit is generally ₹1,00,000 per day depending on your bank.",
        "how to set up upi": "Install a UPI app, register your mobile number, create UPI PIN and generate QR code.",
        "security": "Never share OTP, UPI PIN or CVV with anyone.",
        "failed": "Failed transactions are usually refunded within 5-7 working days.",
        "forgot upi pin": "Use 'Forgot UPI PIN' option in your app and verify using debit card details.",
    "app not working": "Check internet, update the app, restart phone or reinstall if necessary.",
    "which app best": "Google Pay, PhonePe, Paytm and BHIM are popular and reliable UPI apps.",
    "transaction charges": "UPI transactions are generally free for customers. Some merchant rules may vary.",
    "what is qr code": "A QR code allows customers to scan and pay directly to your bank account using any UPI app.",
    };

    /* ==============================
       STYLES
    ============================== */
    const style = document.createElement('style');
    style.textContent = `
    #kirana-fab {
        position: fixed;
        bottom: 90px;
        right: 25px;
        width: 65px;
        height: 65px;
        border-radius: 50%;
        background: linear-gradient(135deg,#7f5af0,#9333ea);
        color: white;
        font-size: 26px;
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 10px 30px rgba(147,51,234,0.5);
    }

    #kirana-panel {
        position: fixed;
        bottom: 110px;
        right: 25px;
        width: 370px;
        height: 560px;
        background: #0f172a;
        border-radius: 20px;
        display: none;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 25px 70px rgba(0,0,0,0.6);
        font-family: 'Segoe UI', sans-serif;
    }

    #kirana-header {
        background: linear-gradient(135deg,#7f5af0,#9333ea);
        color: white;
        padding: 18px;
        font-size: 16px;
        font-weight: 600;
    }

    #kirana-messages {
        flex: 1;
        padding: 18px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .kirana-msg {
        max-width: 75%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 14px;
        line-height: 1.4;
        animation: fadeIn 0.3s ease;
    }

    .kirana-user {
        align-self: flex-end;
        background: linear-gradient(135deg,#7f5af0,#6246ea);
        color: white;
        border-bottom-right-radius: 4px;
    }

    .kirana-bot {
        align-self: flex-start;
        background: #1e293b;
        color: #e2e8f0;
        border-bottom-left-radius: 4px;
    }

    /* Typing Dots */
    .typing {
        display: flex;
        gap: 5px;
        padding: 10px 14px;
        background: #1e293b;
        border-radius: 14px;
        width: fit-content;
    }

    .dot {
        width: 6px;
        height: 6px;
        background: #a78bfa;
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out both;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
        0%,80%,100% { transform: scale(0); }
        40% { transform: scale(1); }
    }

    #kirana-input-area {
        display: flex;
        padding: 15px;
        background: #1e293b;
        align-items: center;
    }

    #kirana-input {
        flex: 1;
        padding: 10px 14px;
        border-radius: 30px;
        border: none;
        background: #334155;
        color: white;
        font-size: 14px;
        outline: none;
    }

    #kirana-input::placeholder {
        color: #94a3b8;
    }

    /* Modern Send Button */
    #kirana-send {
        margin-left: 10px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg,#7f5af0,#9333ea);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 20px rgba(147,51,234,0.6);
        transition: transform 0.2s ease;
    }

    #kirana-send:hover {
        transform: scale(1.1);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    `;
    document.head.appendChild(style);

    /* ==============================
       HTML
    ============================== */
    const widget = document.createElement('div');
    widget.id = "kirana-widget";
    widget.innerHTML = `
        <button id="kirana-fab">${BOT_AVATAR}</button>
        <div id="kirana-panel">
            <div id="kirana-header">${BOT_NAME}</div>
            <div id="kirana-messages"></div>
            <div id="kirana-input-area">
                <input id="kirana-input" type="text" placeholder="Ask about UPI..." />
                <button id="kirana-send">
                    ➤
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(widget);

    const fab = document.getElementById("kirana-fab");
    const panel = document.getElementById("kirana-panel");
    const messages = document.getElementById("kirana-messages");
    const input = document.getElementById("kirana-input");
    const sendBtn = document.getElementById("kirana-send");

    fab.addEventListener("click", () => {
        panel.style.display = panel.style.display === "flex" ? "none" : "flex";
        if (messages.children.length === 0) autoGreeting();
    });

    sendBtn.addEventListener("click", sendMessage);
    input.addEventListener("keypress", e => {
        if (e.key === "Enter") sendMessage();
    });

    function autoGreeting() {
        const hour = new Date().getHours();
        let greeting = hour < 12 ? "Good Morning ☀️" :
                       hour < 17 ? "Good Afternoon 🌤️" :
                       "Good Evening 🌙";
        addMessage(`${greeting}! Welcome to Smart Kirana Assistant.`, "bot");
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        addMessage(text, "user");
        input.value = "";

        showTyping();

        setTimeout(() => {
            removeTyping();
            addMessage(getBotResponse(text), "bot");
        }, 1200);
    }

    function addMessage(text, type) {
        const div = document.createElement("div");
        div.className = `kirana-msg kirana-${type}`;
        div.innerText = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing";
        typingDiv.id = "typing-indicator";
        typingDiv.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        messages.appendChild(typingDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function removeTyping() {
        const typing = document.getElementById("typing-indicator");
        if (typing) typing.remove();
    }

    function getBotResponse(message) {
        const msg = message.toLowerCase();

        if (msg.includes("hi") || msg.includes("hello"))
            return "Hello 👋 How can I help you with UPI today?";
        if (msg.includes("hru") || msg.includes ("how are you?")) {
        return "I am Good😊!! what about you, How can I help you today?";
    }
    if (msg.includes("upi") || msg.includes("UPI related")) {
        return "UPI, or Unified Payments Interface, is a real-time digital payment system that allows users to send money, pay bills, and manage accounts through a single app.";
    }
    if (msg.includes("What you can do") || msg.includes("how you can help me")) {
        return "UPI, or Unified Payments Interface, is a real-time digital payment system that allows users to send money, pay bills, and manage accounts through a single app.";
    }
    if (msg.includes("thanks") || msg.includes("Thank you")) {
        return "UPI, or Unified Payments Interface, is a real-time digital payment system that allows users to send money, pay bills, and manage accounts through a single app.";
    }

        for (let key in knowledgeBase) {
            if (msg.includes(key)) return knowledgeBase[key];
        }

        return "Sorry!! I can help with UPI setup, security, QR codes and transaction issues.";
    }

})();