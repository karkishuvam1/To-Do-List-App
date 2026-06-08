const passwordInput = document.getElementById('password');
const eyeIcon       = document.getElementById('eyeIcon');

const eyeOpenPath   = '../images/icons/eye.svg';
const eyeClosedPath = '../images/icons/closed-eye.svg';

/* Toggle password visibility on eye icon click */
eyeIcon.addEventListener('click', function () {

  if (passwordInput.type === 'password') {
    /* Show password — switch to text type */
    passwordInput.type = 'text';
    eyeIcon.src        = eyeClosedPath;
    eyeIcon.alt        = 'Hide password';
  } else {
    /* Hide password — switch back to password type */
    passwordInput.type = 'password';
    eyeIcon.src        = eyeOpenPath;
    eyeIcon.alt        = 'Show password';
  }

});

/* ════════════════════════════════
   2. PROFILE PHOTO PREVIEW
   When user selects a photo,
   show it inside the circle
   ════════════════════════════════ */
const photoInput   = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoCircle  = document.querySelector('.photo-circle');

/* Listen for file selection */
photoInput.addEventListener('change', function () {

  const file = this.files[0];  /* Get the selected file */

  /* Only proceed if a file was selected */
  if (!file) return;

  /* Use FileReader to read the image as a data URL */
  const reader = new FileReader();

  reader.onload = function (e) {
    /* Set the preview image source to the selected file */
    photoPreview.src = e.target.result;

    /* Add class to circle — CSS will show preview & hide default state */
    photoCircle.classList.add('has-photo');
  };

  reader.readAsDataURL(file);

});