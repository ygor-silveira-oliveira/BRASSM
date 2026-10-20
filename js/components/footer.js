/** Footer: ano atual e cópia do endereço de email. */
export function initFooter() {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();

  const emailButton = document.querySelector("[data-copy-email]");
  if (!emailButton || emailButton.dataset.copyReady) return;
  emailButton.dataset.copyReady = "true";
  const label = emailButton.querySelector(".site-footer__email-address");
  let resetTimer;

  emailButton.addEventListener("click", async () => {
    const email = emailButton.dataset.copyEmail;
    clearTimeout(resetTimer);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement("textarea");
        field.value = email;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        try {
          field.select();
          if (!document.execCommand("copy")) throw new Error("Copy failed");
        } finally {
          field.remove();
          emailButton.focus({ preventScroll: true });
        }
      }
      label.textContent = "Copied!";
    } catch {
      label.textContent = "Failed to copy";
    }
    resetTimer = setTimeout(() => {
      label.textContent = email;
    }, 2500);
  });
}
