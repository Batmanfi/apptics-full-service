"use strict";

const video = document.querySelector("#rayan-video");
const playButton = document.querySelector(".video-play");
if (video && playButton) {
  video.controls = false;
  playButton.hidden = false;
  playButton.addEventListener("click", async () => {
    video.controls = true;
    try {
      await video.play();
      playButton.hidden = true;
    } catch {
      playButton.hidden = false;
    }
  });
  video.addEventListener("play", () => {
    playButton.hidden = true;
  });
  video.addEventListener("ended", () => {
    playButton.hidden = false;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) video.pause();
  });
}

const modal = document.querySelector("#apptics-form-modal");
const page = document.querySelector("#main");
const openers = document.querySelectorAll("[data-open-form]");
const FORM_STATE = "apptics-form";

function focusableIn(root) {
  return [
    ...root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => el.offsetParent !== null || el === document.activeElement);
}

function openForm(pushHistory) {
  if (!modal || modal.classList.contains("is-open")) return;
  window.mountAppticsForm?.();
  modal.hidden = false;
  modal.classList.add("is-open");
  document.body.classList.add("form-open");
  if (page) page.inert = true;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const first = focusableIn(modal)[0] || modal;
      first.focus();
    });
  });
  if (pushHistory !== false) {
    history.pushState({ [FORM_STATE]: true }, "", location.href);
  }
}

function closeForm(fromPop) {
  if (!modal || !modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  document.body.classList.remove("form-open");
  if (page) page.inert = false;
  window.setTimeout(
    () => {
      if (!modal.classList.contains("is-open")) modal.hidden = true;
    },
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 120,
  );
  const lastOpener = document.querySelector("[data-open-form]");
  if (lastOpener) lastOpener.focus();
  if (!fromPop && history.state && history.state[FORM_STATE]) {
    history.back();
  }
}

if (modal && openers.length) {
  openers.forEach((button) => {
    button.addEventListener("click", () => openForm(true));
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const nodes = focusableIn(modal);
    if (!nodes.length) {
      event.preventDefault();
      modal.focus();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("popstate", () => {
    if (modal.classList.contains("is-open")) closeForm(true);
  });
}
