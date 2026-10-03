// --- Copy email ---
const copyBtn = document.getElementById("copy-email");
const status = document.getElementById("c-status");

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    status.textContent = "Email copied.";
  } catch {
    status.textContent = "Couldn't copy. Select the address and copy it manually.";
  }
  setTimeout(() => (status.textContent = ""), 2500);
});
