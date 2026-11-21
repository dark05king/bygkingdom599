(() => {
  const dialog = document.getElementById('authDialog');
  const form = document.getElementById('authForm');
  const email = document.getElementById('authEmail');
  const password = document.getElementById('authPassword');
  const message = document.getElementById('authMessage');
  const submit = document.getElementById('authSubmit');
  const signInButton = document.getElementById('signInButton');
  const signOutButton = document.getElementById('signOutButton');
  const accessStatus = document.getElementById('accessStatus');

  function updateSession() {
    const active = localStorage.getItem('kingdom599_admin') === 'true';
    if (typeof setAdmin === 'function') setAdmin(active);
    if (signInButton) signInButton.hidden = active;
    if (signOutButton) signOutButton.hidden = !active;
    if (accessStatus) accessStatus.textContent = active ? 'Admin' : 'Viewer';
  }

  window.showLogin = function () {
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  window.signOut = function () {
    localStorage.removeItem('kingdom599_admin');
    updateSession();
  };

  window.recoverAccount = function () {
    if (message) message.textContent = 'Use the admin password configured for this command center.';
  };

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const configuredPassword = window.KINGDOM599_ADMIN_PASSWORD || '599admin';
    if (password?.value === configuredPassword) {
      localStorage.setItem('kingdom599_admin', 'true');
      updateSession();
      dialog.close();
      if (message) message.textContent = '';
      form.reset();
    } else {
      if (submit) {
        submit.textContent = 'Try again';
        setTimeout(() => { submit.textContent = 'Sign in'; }, 1200);
      }
      if (message) message.textContent = 'Incorrect admin password.';
    }
  });

  updateSession();
})();
