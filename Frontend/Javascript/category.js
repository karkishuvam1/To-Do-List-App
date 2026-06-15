/*  1. Color picker — only one dot active at a time  */
const colorDots = document.querySelectorAll('.color-dot');

colorDots.forEach(function (dot) {
  dot.addEventListener('click', function () {
    /* Remove active from all dots */
    colorDots.forEach(d => d.classList.remove('active'));
    /* Set active on clicked dot */
    this.classList.add('active');
  });
});

/*  2. Back button  */
document.getElementById('backBtn').addEventListener('click', function () {
  window.history.back();
});