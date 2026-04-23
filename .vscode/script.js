// Smooth scroll (future sections)

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
  });
});

// Button interaction (simulate product feel)
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const text = document.getElementById("modal-text");
  const okBtn = document.getElementById("okBtn");

  function openModal() {
    modal.classList.add("active");
    runSteps();
  }

  function closeModal() {
    modal.classList.remove("active");
  }

  // Attach to buttons
  document.querySelectorAll(".btn-primary").forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  window.closeModal = closeModal;

  // 🔥 AI Loading Steps
  async function runSteps() {
    okBtn.style.display = "none";

    const steps = [
      "Analyzing your skills...",
      "Mapping career path...",
      "Generating AI roadmap...",
      "Optimizing for placements...",
      "Done 🚀"
    ];

    for (let step of steps) {
      text.innerText = step;
      await new Promise(r => setTimeout(r, 1200));
    }

    okBtn.style.display = "inline-block";
  }
});

function typeLine(element, text, speed = 30, highlight = null) {
  return new Promise(resolve => {
    let i = 0;
    element.classList.add("cursor");
    element.style.opacity = 1;

    function typing() {
      if (i < text.length) {
        element.innerHTML = text.substring(0, i + 1);
        i++;
        setTimeout(typing, speed);
      } else {
        element.classList.remove("cursor");

        if (highlight) {
          element.innerHTML = text.replace(
            highlight,
            `<span class="orange">${highlight}</span>`
          );
        }

        resolve();
      }
    }

    typing();
  });
}

async function runTerminal() {
  for (let line of lines) {
    const el = document.getElementById(line.id);
    el.innerHTML = "";
    await typeLine(el, line.text, 30, line.highlight);
    await new Promise(r => setTimeout(r, 500));
  }
}

/* ============================
   SCROLL TRIGGER LOGIC
============================ */
let hasRun = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasRun) {
  hasRun = true;
  entry.target.classList.add("visible");
  setTimeout(runTerminal, 400);
}
  });
}, {
  threshold: 0.4 // trigger when 40% visible
});

observer.observe(document.getElementById("terminal"));