// Keeps the background glows continuous across pages.
//
// Each page is its own HTML file, so the CSS animation would restart on every
// navigation. We remember when the tab started (sessionStorage) and expose the
// elapsed seconds as --bg-elapsed; style.css turns that into a negative
// animation-delay so every page starts at the same point in the loop.
//
// Load as a plain, blocking script in <head> (NOT type="module"/defer) so it
// runs before first paint and the glows never flash at their start position.

(function () {
  function sync() {
    try {
      var start = Number(sessionStorage.getItem("bg-start"));
      if (!start) {
        start = Date.now();
        sessionStorage.setItem("bg-start", start);
      }
      document.documentElement.style.setProperty(
        "--bg-elapsed",
        (Date.now() - start) / 1000,
      );
    } catch (e) {
      // storage blocked: glows just restart on each page
    }
  }

  sync();

  // Back/forward restores the page frozen where you left it. Update the
  // offset, then restart the glows so they pick it up.
  addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    sync();
    document.querySelectorAll(".blob").forEach(function (blob) {
      blob.style.animation = "none";
      void blob.offsetWidth; // force reflow
      blob.style.animation = "";
    });
  });
})();