const API_URL ='http://localhost:4000/api';

const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const eyeIcon       = document.getElementById('eyeIcon');
const registerBtn = document.getElementById('registerBtn');
const photoInput   = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const photoCircle  = document.querySelector('.photo-circle');



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

/* 

/* Listen for file selection */
photoInput.addEventListener('change', function () {

  const file = this.files[0];  /* Get the selected file */

  /* Only proceed if a file was selected */
  if (!file) return;
  const reader = new FileReader();

  reader.onload = function (e) {
    photoPreview.src = e.target.result;
    photoCircle.classList.add('has-photo');
  };

  reader.readAsDataURL(file);

});

registerForm.addEventListener('submit', async function(e){
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if(!name || !email || !password){
    showError('Please fill all the fields');
    return;
  }

  if (password.length<8){
    showError('Password must be atleast 8 characters');
    return;
  }
  // Loading state
  registerBtn.textContent = 'Creating Account...';
  registerBtn.disabled = true;
  try{
    // Call the backend
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({name, email, password})
    });
    const data = await response.json();
    if(!response.ok){
      showError(data.message);
      return;
    }
    // Saving the token
    localStorage.setItem('token',data.token);
    localStorage.setItem('user',JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email
    }));

    // Redirecting to the home.html
    window.location.href='home.html';
  } catch (error){
    showError('Cannot connect to the server.Please try again.');
  } finally{
    registerBtn.textContent = 'Create Account';
    registerBtn.disabled= false;
  }

  
})
// Show error message
function showError(message){
  const existing = document.getElementById('errorMsg');
  if(existing) existing.remove();

  const error = document.createElement('p');
  error.id = 'errorMsg';
  error.textContent = message;
  error.style.cssText = 'color:#C0392B;font-size:13px;margin-top:10px;text-align:center;';
  registerForm.appendChild(error);
  
}