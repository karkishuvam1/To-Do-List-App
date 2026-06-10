/* Priority Selection */
const priorityBtns = document.querySelectorAll('.priority-btn');

priorityBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    /* Remove active from all, then set on clicked */
    priorityBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/*  Category Selection */
const categoryBtns = document.querySelectorAll('.category-btn:not(.category-new)');

categoryBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    /* Remove active from all, then set on clicked */
    categoryBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/* Close & Cancel — go back to previous page */
document.getElementById('closeBtn').addEventListener('click', function () {
  window.history.back();
});

document.getElementById('cancelBtn').addEventListener('click', function () {
  window.history.back();
});

/* ── Set today's date as default for due date ── */
const dueDateInput = document.getElementById('dueDate');

/* Get today in YYYY-MM-DD format (required by type="date") */
const today = new Date();
const yyyy  = today.getFullYear();
const mm    = String(today.getMonth() + 1).padStart(2, '0'); /* Month is 0-indexed */
const dd    = String(today.getDate()).padStart(2, '0');

dueDateInput.value = `${yyyy}-${mm}-${dd}`;  /* e.g. 2026-06-10 */

/* Set minimum date to today — prevents selecting past dates */
dueDateInput.min = `${yyyy}-${mm}-${dd}`;