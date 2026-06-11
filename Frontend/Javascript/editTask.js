/*  1. Set default due date  */
const dueDateInput = document.getElementById('dueDate');

const today = new Date();
const yyyy  = today.getFullYear();
const mm    = String(today.getMonth() + 1).padStart(2, '0');
const dd    = String(today.getDate()).padStart(2, '0');

/* Pre-fill with existing task date — replace with actual task data later */
dueDateInput.value = `${yyyy}-${mm}-${dd}`;

/*  2. Priority button selection  */
const priorityBtns = document.querySelectorAll('.priority-btn');

priorityBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    priorityBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/*  3. Category button selection  */
const categoryBtns = document.querySelectorAll('.category-btn:not(.category-new)');

categoryBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    categoryBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/*  4. Mark as completed toggle  */
const toggle = document.getElementById('completedToggle');

/* Toggle starts ON — matching the design */
toggle.classList.add('on');

toggle.addEventListener('click', function () {
  this.classList.toggle('on');
});

/*  5. Close & Cancel — go back  */
document.getElementById('closeBtn').addEventListener('click', function () {
  window.history.back();
});

document.getElementById('cancelBtn').addEventListener('click', function () {
  window.history.back();
});