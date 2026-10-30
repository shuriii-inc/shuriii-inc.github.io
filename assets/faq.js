const faqButtons = document.querySelectorAll(".faq-button");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentItem = button.closest("li");
    const content = currentItem.querySelector(".faq-content");
    const answer = currentItem.querySelector(".faq-answer");
    const plus = currentItem.querySelector(".faq-plus");
    const minus = currentItem.querySelector(".faq-minus");

    const isOpen = button.getAttribute("aria-expanded") === "true";

    // Close all FAQs
    faqButtons.forEach((otherButton) => {
      const otherItem = otherButton.closest("li");
      const otherContent = otherItem.querySelector(".faq-content");
      const otherAnswer = otherItem.querySelector(".faq-answer");
      const otherPlus = otherItem.querySelector(".faq-plus");
      const otherMinus = otherItem.querySelector(".faq-minus");

      otherButton.setAttribute("aria-expanded", "false");

      otherContent.classList.remove("grid-rows-[1fr]");
      otherContent.classList.add("grid-rows-[0fr]");

      if (otherAnswer) {
        otherAnswer.classList.remove("opacity-100");
        otherAnswer.classList.add("opacity-0");
      }

      otherPlus.classList.remove("opacity-0");
      otherPlus.classList.add("opacity-100");

      otherMinus.classList.remove("opacity-100");
      otherMinus.classList.add("opacity-0");
    });

    // Open current FAQ if it was closed
    if (!isOpen) {
      button.setAttribute("aria-expanded", "true");

      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]");

      if (answer) {
        answer.classList.remove("opacity-0");
        answer.classList.add("opacity-100");
      }

      plus.classList.remove("opacity-100");
      plus.classList.add("opacity-0");

      minus.classList.remove("opacity-0");
      minus.classList.add("opacity-100");
    }
  });
});
