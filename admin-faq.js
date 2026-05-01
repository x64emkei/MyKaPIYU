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

  // Mock Knowledge Base
  let faqs = [
    {
      id: 1,
      question: "How do I request a transcript?",
      keywords: ["transcript", "tor", "grades", "records"],
      answer: "You can request your Transcript of Records (TOR) by visiting the University Registrar's office during office hours or submitting an online request via the Academics tab."
    },
    {
      id: 2,
      question: "What are the enrollment dates?",
      keywords: ["enrollment", "enroll", "dates", "schedule"],
      answer: "Enrollment for the upcoming semester begins on December 1st and ends on December 15th. Late enrollment is subject to a fee."
    },
    {
      id: 3,
      question: "What are the cashier hours?",
      keywords: ["cashier", "payment", "hours", "tuition"],
      answer: "The cashier's office is open Monday to Friday, from 8:00 AM to 4:00 PM, with no noon break."
    }
  ];

  const tbody = document.getElementById('faqTableBody');
  const form = document.getElementById('faqForm');

  function renderTable() {
    tbody.innerHTML = '';
    faqs.forEach(faq => {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--border-color)';
      
      const keywordBadges = faq.keywords.map(kw => `<span class="badge" style="background-color: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); margin-right: 4px; margin-bottom: 4px;">${kw.trim()}</span>`).join('');

      tr.innerHTML = `
        <td style="padding: 1rem;">${faq.question}</td>
        <td style="padding: 1rem;">${keywordBadges}</td>
        <td style="padding: 1rem; text-align: right;">
          <button class="btn btn-outline btn-sm edit-btn" data-id="${faq.id}" style="padding: 0.25rem 0.5rem; margin-right: 0.5rem;"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-outline btn-sm delete-btn" data-id="${faq.id}" style="padding: 0.25rem 0.5rem; color: #dc3545; border-color: #dc3545;"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        const faq = faqs.find(f => f.id === id);
        if (faq) {
          document.getElementById('faqQuestion').value = faq.question;
          document.getElementById('faqKeywords').value = faq.keywords.join(', ');
          document.getElementById('faqAnswer').value = faq.answer;
          // Temporarily remove it so saving acts as an update
          faqs = faqs.filter(f => f.id !== id);
          renderTable();
          // Scroll to form
          document.getElementById('faqForm').scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        faqs = faqs.filter(f => f.id !== id);
        renderTable();
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newFaq = {
        id: Date.now(),
        question: document.getElementById('faqQuestion').value,
        keywords: document.getElementById('faqKeywords').value.split(','),
        answer: document.getElementById('faqAnswer').value
      };

      faqs.push(newFaq);
      renderTable();
      form.reset();
      
      // Simulate backend save
      alert("New FAQ added successfully!");
    });
  }

  renderTable();
});
