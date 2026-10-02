// Keeps the glow animation continuous across pages.
// Each page is a separate HTML file, so the CSS animation would restart at
// every navigation. Instead we store when the tab's animation "began" and,
// on each page load, start the glows at the matching point in their loop.

const KEY = "bg-start";

function getStart() {
  try {
    const saved = Number(sessionStorage.getItem(KEY));
    if (saved) return saved;
    const now = Date.now();
    sessionStorage.setItem(KEY, String(now));
    return now;
  } catch {
    return Date.now(); // storage blocked: fall back to a normal restart
  }
}

function sync() {
  const elapsed = (Date.now() - getStart()) / 1000;
  document.querySelectorAll(".blob").forEach((blob) => {
    const duration = parseFloat(getComputedStyle(blob).animationDuration);
    if (!duration) return; // static on small screens / reduced motion
    blob.style.animationDelay = `-${(elapsed % duration).toFixed(3)}s`;
  });
}

sync();

// Back/forward cache restores the page without re-running the script.
window.addEventListener("pageshow", (e) => {
  if (e.persisted) sync();
});