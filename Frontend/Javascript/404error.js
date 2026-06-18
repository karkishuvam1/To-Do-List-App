/* ================================
   DoIt — 404 Error Page JavaScript
   Handles: back button
   ================================ */

/* ── Back button ── */
document.getElementById('backBtn').addEventListener('click', function () {
  window.history.back();
});