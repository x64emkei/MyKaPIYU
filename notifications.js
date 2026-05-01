document.addEventListener('DOMContentLoaded', () => {
  const bellIcons = document.querySelectorAll('.notification-bell');
  let unreadCount = 0;

  function createDropdown(bell) {
    const wrapper = document.createElement('div');
    wrapper.className = 'notification-wrapper';
    
    // Move bell into wrapper
    bell.parentNode.insertBefore(wrapper, bell);
    wrapper.appendChild(bell);

    // Create badge
    const badge = document.createElement('div');
    badge.className = 'notification-badge';
    bell.appendChild(badge);

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    wrapper.appendChild(dropdown);

    // Toggle logic
    bell.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('show');
      if(dropdown.classList.contains('show')) {
        badge.classList.remove('active');
        unreadCount = 0;
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    return { dropdown, badge };
  }

  // Initialize for all bells found
  const notificationUIs = Array.from(bellIcons).map(bell => createDropdown(bell));

  function updateDropdownUI(notifications) {
    notificationUIs.forEach(ui => {
      ui.dropdown.innerHTML = ''; // clear
      if (notifications.length === 0) {
        ui.dropdown.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted);">No new notifications</div>';
      } else {
        notifications.forEach(notif => {
          const item = document.createElement('div');
          item.className = `notification-item ${notif.unread ? 'unread' : ''}`;
          item.innerHTML = `
            <div>
              <div style="font-weight: 500; font-size: 0.875rem;">${notif.title}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${notif.time}</div>
            </div>
          `;
          ui.dropdown.appendChild(item);
        });
      }

      const hasUnread = notifications.some(n => n.unread);
      if (hasUnread) {
        ui.badge.classList.add('active');
      }
    });
  }

  // Mock Fetch API
  function fetchNotifications() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { id: 1, title: 'Your Transcript Request is now Processing.', time: 'Just now', unread: true },
          { id: 2, title: 'Event Reminder: Tech Summit 2023', time: '2 hours ago', unread: false }
        ]);
      }, 500);
    });
  }

  // Initial fetch
  fetchNotifications().then(data => {
    unreadCount = data.filter(n => n.unread).length;
    updateDropdownUI(data);
  });

  // Poll every 30 seconds
  setInterval(() => {
    fetchNotifications().then(data => {
      unreadCount = data.filter(n => n.unread).length;
      updateDropdownUI(data);
      console.log('Polled mock /api/notifications');
    });
  }, 30000);
});
