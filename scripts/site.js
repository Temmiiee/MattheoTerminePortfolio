// Small client script: set copyright year and improve skip-link behavior
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', function (e) {
      var main = document.getElementById('main');
      if (main) {
        setTimeout(function () {
          main.focus();
        }, 10);
      }
    });
  }
})();
