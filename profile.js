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

  // Drag and Drop Zone Logic
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Highlight drop zone when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => {
      dropZone.classList.remove('dragover');
    }, false);
  });

  // Handle dropped files
  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  // Handle clicked files
  dropZone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', function() {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    ([...files]).forEach(uploadFile);
  }

  function uploadFile(file) {
    const reader = new FileReader();
    reader.onloadend = function() {
      const fileItem = document.createElement('div');
      fileItem.className = 'flex items-center justify-between p-3 mt-3';
      fileItem.style.backgroundColor = 'var(--bg-color)';
      fileItem.style.borderRadius = 'var(--radius-md)';
      fileItem.style.border = '1px solid var(--border-color)';
      
      const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB

      fileItem.innerHTML = `
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-file-pdf text-primary" style="font-size: 1.5rem;"></i>
          <div>
            <div style="font-weight: 500; font-size: 0.875rem;">${file.name}</div>
            <div class="text-muted" style="font-size: 0.75rem;">${fileSize} MB</div>
          </div>
        </div>
        <button class="btn btn-outline" style="padding: 0.25rem 0.5rem; border: none;" onclick="this.parentElement.remove()">
          <i class="fa-solid fa-times text-muted"></i>
        </button>
      `;
      
      fileList.appendChild(fileItem);
    }
    reader.readAsDataURL(file);
  }

  // Profile Form Mock Submission
  const profileForm = document.getElementById('profileForm');
  if(profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Profile details updated successfully!');
    });
  }
});
