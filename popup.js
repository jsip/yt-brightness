const getBrightness = (brightness) => {
  brightness.addEventListener("change", async () => {
    let chosenBrightness = brightness.value;
    chrome.storage.sync.set({ brightness: chosenBrightness });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBrightness,
    });
  });
}

const setBrightness = () => {
  chrome.storage.sync.get("brightness", ({ brightness }) => {
    let playerContainer = document.querySelector("#player-container-outer")
    playerContainer.style.filter = `brightness(${brightness}%)`;
  });
}

setTimeout(() => {
  let brightness = document.querySelector("#brightnessScale");
  getBrightness(brightness);
}, 1500);