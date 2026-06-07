const passwordInput = document.getElementById('password');
const eyeIcon       = document.getElementById('eyeIcon');

/* ── Eye Icon Paths ── */
const eyeOpenPath   = '../images/icons/eye.svg';
const eyeClosedPath = '../images/icons/closed-eye.svg';

/* ──────────────────────────────
   PASSWORD VISIBILITY TOGGLE
   Clicking the eye icon switches
   the input between text and password
   ────────────────────────────── */
eyeIcon.addEventListener('click', function () {

  if (passwordInput.type === 'password') {
    /* Show password */
    passwordInput.type = 'text';
    eyeIcon.src        = eyeClosedPath;
    eyeIcon.alt        = 'Hide password';
  } else {
    /* Hide password */
    passwordInput.type = 'password';
    eyeIcon.src        = eyeOpenPath;
    eyeIcon.alt        = 'Show password';
  }

});