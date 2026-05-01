document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  // Toggle to Register Form
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  // Toggle to Login Form
  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Mock Form Submissions
  document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate login and redirect
    window.location.href = 'dashboard.html';
  });

  document.getElementById('formRegister').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate registration and redirect
    window.location.href = 'dashboard.html';
  });
});
