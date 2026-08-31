"use strict";
// The page and FAQs remain usable without JavaScript.
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
      // Keep native controls available if playback is blocked.
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
