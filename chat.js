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

  const faqData = [
    {
      question: "How do I request a copy of my Transcript of Records (TOR)?",
      answer: "You can request a copy of your TOR by navigating to the Dashboard, clicking 'File New Concern', and selecting 'Registrar' as the department. Make sure to attach any required clearance forms."
    },
    {
      question: "Where can I register for upcoming university events?",
      answer: "Navigate to the 'Announcements' page from the sidebar. You will see a list of upcoming events on the right side. If there are slots available, click the 'Register Now' button."
    },
    {
      question: "What should I do if my grades are not reflecting?",
      answer: "Wait for 2-3 days after the encoding deadline. If they are still missing, file a concern under the 'Registrar' department and include your course code and professor's name."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to 'My Profile' in the sidebar menu. You can update your contact information and upload required documents using the drag-and-drop zone provided."
    },
    {
      question: "Is there a way to track the status of my requests?",
      answer: "Yes. On your Dashboard, all your filed concerns are displayed as cards. You can see progress bars and status capsules (e.g., Pending, Resolved) indicating their current state."
    }
  ];

  const faqContainer = document.getElementById('faqContainer');
  const searchInput = document.getElementById('faqSearch');

  function renderFAQs(query = '') {
    if (!faqContainer) return;
    faqContainer.innerHTML = '';

    const filteredData = faqData.filter(item => 
      item.question.toLowerCase().includes(query.toLowerCase()) || 
      item.answer.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      faqContainer.innerHTML = `<div class="text-center text-muted w-full py-4">No FAQs match your search.</div>`;
      return;
    }

    filteredData.forEach((item, index) => {
      const faqItem = document.createElement('div');
      faqItem.className = 'card mb-4';
      faqItem.style.cursor = 'pointer';
      
      faqItem.innerHTML = `
        <div class="flex justify-between items-center faq-question" style="font-weight: 500; font-size: 1.125rem;">
          <span>${item.question}</span>
          <i class="fa-solid fa-chevron-down text-muted transition-icon" style="transition: transform 0.2s;"></i>
        </div>
        <div class="faq-answer mt-3 text-muted hidden" style="line-height: 1.6; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          ${item.answer}
        </div>
      `;

      // Add click event for accordion
      faqItem.addEventListener('click', () => {
        const answer = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('.transition-icon');
        
        if (answer.classList.contains('hidden')) {
          answer.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          answer.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      });

      faqContainer.appendChild(faqItem);
    });
  }

  renderFAQs();

  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderFAQs(e.target.value);
    });
  }
});
