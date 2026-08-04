const API_URL = 'http://localhost:4000/api';


const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const eyeIcon = document.getElementById('eyeIcon');
const loginBtn = document.getElementById('loginBtn');


/*  Eye Icon Paths  */
const eyeOpenPath   = '../images/icons/eye.svg';
const eyeClosedPath = '../images/icons/closed-eye.svg';

/* Toggle password visibility on eye icon click */
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

loginForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if(!email || !password){
    showError( "Please enter your email and password");
    return;
  }

  loginBtn.textContent = 'Signing in...';
  loginBtn.disabled = true; //It will disable the button to prevent multiple submissions
  try{
    const response = await fetch(`${API_URL}/auth/login`,{
      method:'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({email,password})
    });
    const data = await response.json(); //It will parse the response as JSON
    if(!response.ok){
      showError(data.message);
      return;
    }
    // Saving to the local storage

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      _id: data._id,
      name: data.name,
      email: data.email
    }));

    window.location.href = 'home.html';

  } catch(error){
    showError('Cannot connect to the server. Please try again');
  } finally {
    loginBtn.textContent = 'Sign In';
    loginBtn.disabled = false; //It will enable the button after the request is completed
  }
});

function showError(message){
  const existing = document.getElementById('errorMsg');
  if(existing) existing.remove(); //It will remove the existing error message if any

  const error = document.createElement('p'); //It will create a new paragraph element to show the error message
  error.id = 'errorMsg';
  error.textContent = message;
  error.style.cssText = 'color:#C0392B;font-size:13px;margin-top:10px;text-align:center;';

  loginForm.appendChild(error); //It will append the error message to the login form
}