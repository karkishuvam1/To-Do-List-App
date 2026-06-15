/* 1. Mark as completed toggle */
const toggle = document.getElementById('completedToggle');

/* Start ON to match the design */
toggle.classList.add('on');

toggle.addEventListener('click', function () {
  this.classList.toggle('on');
});

/* 2. Back button */
document.getElementById('backBtn').addEventListener('click', function () {
  window.history.back();
});