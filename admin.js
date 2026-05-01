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

  // Mock Admin Data
  const globalConcerns = [
    {
      id: 'REQ-1029',
      studentName: 'Juan Dela Cruz',
      title: 'Missing Grades in Portal',
      status: 'pending',
      department: 'Registrar',
      date: 'Oct 24, 2023'
    },
    {
      id: 'REQ-1033',
      studentName: 'Maria Santos',
      title: 'ID Replacement Request',
      status: 'pending',
      department: 'Student Affairs',
      date: 'Oct 28, 2023'
    },
    {
      id: 'REQ-1015',
      studentName: 'Mark Reyes',
      title: 'Scholarship Document',
      status: 'resolved',
      department: 'Scholarship',
      date: 'Oct 15, 2023'
    }
  ];

  const adminGrid = document.getElementById('adminConcernsGrid');

  function renderAdminConcerns() {
    if(!adminGrid) return;
    adminGrid.innerHTML = '';

    globalConcerns.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card mb-4';
      
      const isPending = item.status === 'pending';
      const statusBadge = isPending 
        ? `<span class="badge badge-pending">Pending</span>`
        : `<span class="badge badge-resolved">Resolved</span>`;
      
      const actionBtn = isPending 
        ? `<button class="btn btn-primary btn-sm resolve-btn" data-id="${item.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;"><i class="fa-solid fa-check mr-2"></i>Mark Resolved</button>`
        : `<button class="btn btn-outline btn-sm" disabled style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border: none;"><i class="fa-solid fa-check-double text-muted mr-2"></i>Done</button>`;

      card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <div>
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${item.id} &bull; ${item.studentName}</div>
            <h3 style="font-size: 1.125rem;">${item.title}</h3>
          </div>
          ${statusBadge}
        </div>
        <div class="flex justify-between items-center mt-4">
          <div class="text-muted" style="font-size: 0.75rem;">
            <i class="fa-solid fa-building mr-2"></i>${item.department} &bull; ${item.date}
          </div>
          ${actionBtn}
        </div>
      `;
      adminGrid.appendChild(card);
    });

    // Attach event listeners to Resolve buttons
    document.querySelectorAll('.resolve-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reqId = e.target.closest('.resolve-btn').getAttribute('data-id');
        markAsResolved(reqId);
      });
    });
  }

  function markAsResolved(id) {
    const concern = globalConcerns.find(c => c.id === id);
    if(concern) {
      concern.status = 'resolved';
      renderAdminConcerns();
    }
  }

  renderAdminConcerns();

  // Announcement Form Mock Submission
  const announcementForm = document.getElementById('announcementForm');
  if(announcementForm) {
    announcementForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('annTitle').value;
      const content = document.getElementById('annContent').value;
      const isImportant = document.getElementById('annImportant').checked;

      // In a real app, this would push to the backend, then show up in announcements.js
      alert(`Announcement "${title}" posted successfully!\nImportant: ${isImportant}`);
      
      announcementForm.reset();
    });
  }
});
