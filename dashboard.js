document.addEventListener('DOMContentLoaded', () => {
  // Mobile Sidebar Toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const toggleBtn = document.getElementById('mobileMenuToggle');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
  }

  toggleBtn.addEventListener('click', openSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Mock Data for Concerns
  const concernsData = [
    {
      id: 'REQ-1029',
      title: 'Missing Grades in Portal',
      description: 'My grades for IT101 are not reflecting in my student portal despite being submitted by the professor.',
      status: 'pending',
      department: 'Registrar',
      date: 'Oct 24, 2023',
      progress: 30
    },
    {
      id: 'REQ-1015',
      title: 'Scholarship Document Verification',
      description: 'Submitted my updated income tax return for the CHED scholarship renewal.',
      status: 'resolved',
      department: 'Scholarship Office',
      date: 'Oct 15, 2023',
      progress: 100
    },
    {
      id: 'REQ-1033',
      title: 'ID Replacement Request',
      description: 'Lost my student ID last week. Requesting a new one, already paid the fee at the cashier.',
      status: 'pending',
      department: 'Student Affairs',
      date: 'Oct 28, 2023',
      progress: 75
    }
  ];

  const gridContainer = document.getElementById('concernsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('searchInput');

  // Render Function
  function renderConcerns(filter = 'all', searchQuery = '') {
    gridContainer.innerHTML = ''; // Clear current

    const filteredData = concernsData.filter(item => {
      const matchFilter = filter === 'all' || item.status === filter;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (filteredData.length === 0) {
      gridContainer.innerHTML = `<div class="text-muted w-full text-center py-4" style="grid-column: 1 / -1;">No concerns found.</div>`;
      return;
    }

    filteredData.forEach(item => {
      const isResolved = item.status === 'resolved';
      const statusBadge = isResolved 
        ? `<span class="badge badge-resolved"><i class="fa-solid fa-check-circle mr-2"></i>Resolved</span>`
        : `<span class="badge badge-pending"><i class="fa-solid fa-clock mr-2"></i>Pending</span>`;
      
      const card = document.createElement('div');
      card.className = 'card';
      
      card.innerHTML = `
        <div class="flex justify-between items-center mb-4">
          <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted);">${item.id}</span>
          ${statusBadge}
        </div>
        <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem;">${item.title}</h3>
        <p class="text-muted" style="font-size: 0.875rem; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${item.description}
        </p>
        
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2" style="font-size: 0.75rem;">
            <span style="font-weight: 500;">Progress</span>
            <span>${item.progress}%</span>
          </div>
          <div style="width: 100%; background-color: var(--border-color); height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="width: ${item.progress}%; background-color: ${isResolved ? 'var(--status-resolved)' : 'var(--status-pending)'}; height: 100%; border-radius: 3px;"></div>
          </div>
        </div>

        <div class="flex justify-between items-center mt-auto" style="border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <div class="flex items-center gap-2 text-muted" style="font-size: 0.75rem;">
            <i class="fa-solid fa-building"></i> ${item.department}
          </div>
          <div class="text-muted" style="font-size: 0.75rem;">
            ${item.date}
          </div>
        </div>
      `;
      
      gridContainer.appendChild(card);
    });
  }

  // Initial Render
  renderConcerns();

  // Filter Event Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('btn-primary');
        b.classList.add('btn-outline');
      });
      e.target.classList.remove('btn-outline');
      e.target.classList.add('btn-primary');

      const filterValue = e.target.getAttribute('data-filter');
      renderConcerns(filterValue, searchInput.value);
    });
  });

  // Search Event Listener
  searchInput.addEventListener('input', (e) => {
    const activeFilterBtn = document.querySelector('.filter-btn.btn-primary');
    const filterValue = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    renderConcerns(filterValue, e.target.value);
  });

});
