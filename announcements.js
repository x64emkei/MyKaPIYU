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

  // Mock Data: Announcements
  const announcements = [
    {
      id: 1,
      title: "Midterm Examinations Schedule Release",
      author: "Office of the University Registrar",
      date: "Nov 2, 2023",
      content: "The official schedule for the First Semester Midterm Examinations has been released. Please check the university portal for your specific departmental schedules. Examinations will strictly follow the synchronized university timetable.",
      isImportant: true
    },
    {
      id: 2,
      title: "Campus Wi-Fi Maintenance",
      author: "IT Services",
      date: "Oct 30, 2023",
      content: "There will be a scheduled maintenance of the campus-wide Wi-Fi infrastructure this coming Saturday, Nov 4, from 8:00 AM to 5:00 PM. Intermittent connectivity is expected.",
      isImportant: false
    }
  ];

  // Mock Data: Events
  const events = [
    {
      id: 101,
      title: "LSPU Tech Summit 2023",
      date: "Nov 15, 2023 - 8:00 AM",
      location: "Main Gymnasium",
      slotsAvailable: 45,
      registered: false
    },
    {
      id: 102,
      title: "Job Fair & Career Orientation",
      date: "Nov 20, 2023 - 9:00 AM",
      location: "Cultural Center",
      slotsAvailable: 120,
      registered: true
    }
  ];

  // Render Announcements
  const feedContainer = document.getElementById('announcementsFeed');
  if (feedContainer) {
    announcements.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card mb-4';
      
      const importantBadge = item.isImportant ? `<span class="badge badge-pending mb-2"><i class="fa-solid fa-star mr-2"></i>Important</span>` : '';
      
      card.innerHTML = `
        ${importantBadge}
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--primary-color);">${item.title}</h3>
        <div class="flex items-center gap-2 mb-3 text-muted" style="font-size: 0.875rem;">
          <span><i class="fa-solid fa-user-circle"></i> ${item.author}</span>
          <span>&bull;</span>
          <span><i class="fa-solid fa-calendar-alt"></i> ${item.date}</span>
        </div>
        <p style="color: var(--text-color); line-height: 1.6;">${item.content}</p>
      `;
      feedContainer.appendChild(card);
    });
  }

  // Render Events
  const eventsContainer = document.getElementById('eventsList');
  
  function renderEvents() {
    if (!eventsContainer) return;
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'card mb-4';
      card.style.borderLeft = '4px solid var(--accent-color)';
      
      const registerBtn = event.registered 
        ? `<button class="btn btn-outline btn-block mt-3" disabled><i class="fa-solid fa-check mr-2"></i>Registered</button>`
        : `<button class="btn btn-primary btn-block mt-3 register-btn" data-id="${event.id}"><i class="fa-solid fa-ticket mr-2"></i>Register Now</button>`;
      
      card.innerHTML = `
        <h4 style="margin-bottom: 0.5rem;">${event.title}</h4>
        <div class="text-muted" style="font-size: 0.875rem; margin-bottom: 0.25rem;">
          <i class="fa-solid fa-clock mr-2"></i>${event.date}
        </div>
        <div class="text-muted" style="font-size: 0.875rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-location-dot mr-2"></i>${event.location}
        </div>
        <div style="font-size: 0.75rem; color: var(--primary-color); font-weight: 500;">
          ${event.slotsAvailable} slots remaining
        </div>
        ${registerBtn}
      `;
      eventsContainer.appendChild(card);
    });

    // Attach event listeners to new buttons
    document.querySelectorAll('.register-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventId = parseInt(e.target.closest('.register-btn').getAttribute('data-id'));
        registerForEvent(eventId);
      });
    });
  }

  function registerForEvent(id) {
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex !== -1 && events[eventIndex].slotsAvailable > 0) {
      // Simulate API call to register
      events[eventIndex].registered = true;
      events[eventIndex].slotsAvailable -= 1;
      
      // Show simple alert
      alert(`Successfully registered for ${events[eventIndex].title}!`);
      
      // Re-render
      renderEvents();
    }
  }

  renderEvents();
  // Render Featured Carousel
  const featuredCarousel = document.getElementById('featuredCarousel');
  const featuredItems = [
    {
      title: "LSPU Tech Summit 2023",
      image: "event_banner.png",
      tag: "Major Event"
    },
    {
      title: "Campus Wi-Fi Maintenance",
      image: "announcement_banner.png",
      tag: "Important"
    },
    {
      title: "Midterm Examinations",
      image: "announcement_banner.png",
      tag: "Academic"
    }
  ];

  if (featuredCarousel) {
    featuredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card carousel-card';
      card.style.padding = '0'; // Override default padding for banner

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="carousel-banner">
        <div style="padding: 1.25rem;">
          <span class="badge badge-pending mb-2">${item.tag}</span>
          <h3 style="font-size: 1.125rem; margin-bottom: 0; color: var(--primary-color);">${item.title}</h3>
        </div>
      `;
      
      featuredCarousel.appendChild(card);
    });
  }
});
