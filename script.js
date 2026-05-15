const menuButton = document.querySelector("[data-menu-button]");
const navLinks = document.querySelector(".nav-links");
const modeButtons = document.querySelectorAll("[data-mode]");
const waitlistForm = document.querySelector("[data-waitlist-form]");
const formStatus = document.querySelector("[data-form-status]");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-label", "Open menu");
  }
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

waitlistForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(waitlistForm);
  const email = String(data.get("email") || "").trim();

  if (!email) {
    formStatus.textContent = "Please enter your email address.";
    return;
  }

  localStorage.setItem("toicodon_waitlist_email", email);
  formStatus.textContent = "You are on the waitlist. We will contact you before launch.";
  waitlistForm.reset();
});
