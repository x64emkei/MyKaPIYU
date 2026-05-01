document.addEventListener('DOMContentLoaded', () => {
  const formAdminLogin = document.getElementById('formAdminLogin');
  if(formAdminLogin) {
    formAdminLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'admin.html';
    });
  }
});
