document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('mobileMenuToggle');

  if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      sidebarOverlay.classList.add('active');
    });
  }

  if(sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Mock Knowledge Base (Sync with Admin Mock)
  const faqs = [
    {
      question: "How do I request a transcript?",
      keywords: ["transcript", "tor", "grades", "records"],
      answer: "You can request your Transcript of Records (TOR) by visiting the University Registrar's office during office hours or submitting an online request via the Academics tab."
    },
    {
      question: "What are the enrollment dates?",
      keywords: ["enrollment", "enroll", "dates", "schedule"],
      answer: "Enrollment for the upcoming semester begins on December 1st and ends on December 15th. Late enrollment is subject to a fee."
    },
    {
      question: "What are the cashier hours?",
      keywords: ["cashier", "payment", "hours", "tuition"],
      answer: "The cashier's office is open Monday to Friday, from 8:00 AM to 4:00 PM, with no noon break."
    }
  ];

  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    
    let avatarHtml = '';
    if (sender === 'bot') {
      avatarHtml = `<div class="message-avatar bot"><i class="fa-solid fa-robot"></i></div>`;
    }

    msgDiv.innerHTML = `
      ${avatarHtml}
      <div class="message-bubble">${text}</div>
    `;
    
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function handleBotResponse(userMsg) {
    const lowerMsg = userMsg.toLowerCase();
    let foundAnswer = null;

    for (let faq of faqs) {
      if (faq.keywords.some(kw => lowerMsg.includes(kw.trim().toLowerCase()))) {
        foundAnswer = faq.answer;
        break;
      }
    }

    // Typing delay simulation
    setTimeout(() => {
      if (foundAnswer) {
        addMessage(foundAnswer, 'bot');
      } else {
        addMessage("I couldn't find an answer to that. Please go to the Services tab to submit a ticket to the relevant department.", 'bot');
      }
    }, 800); // 800ms thinking delay
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';
    handleBotResponse(text);
  });

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question');
      addMessage(question, 'user');
      handleBotResponse(question);
    });
  });
});
