/*  1. Back button  */
document.getElementById('backBtn').addEventListener('click', function () {
  window.history.back();
});

/*  2. Notifications toggle  */
const notifToggle = document.getElementById('notifToggle');

notifToggle.addEventListener('click', function () {
  this.classList.toggle('on');
});