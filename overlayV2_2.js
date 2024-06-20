const script = document.querySelector('script[src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.js"]');

script.addEventListener("load", log());
script.addEventListener("load", initializeOverlays());

function log() {
// Code to execute after external.js is loaded
console.log('external.js loaded');
};
function initializeOverlays() {

let targetClass = document.getElementsByClassName("fancybox_listing_link");
console.log(targetClass);
let targetArray = Array.from(targetClass);
console.log(targetArray);

if (targetArray.length >= 0) {
const createOverlay = () => {
// generating HTML elements for the text overlay
let newDiv = document.createElement('div');
let specialDeal = document.createElement('span');
specialDeal.innerHTML = 'Special Deal';
let description = document.createElement('span');
description.innerHTML = 'One onwer car, Financing Available Low mileage, Call now!';
newDiv.id = 'overlay_wrapper';
newDiv.appendChild(specialDeal);
newDiv.appendChild(description);

// styling the text and background
newDiv.style.backgroundColor = 'red'; //background color for box
newDiv.style.width = '200px'; //width of entire box
newDiv.style.height = '200px'; //height of entire box
newDiv.style.display = 'flex';
newDiv.style.flexDirection = 'column';
newDiv.style.justifyContent = 'center';
newDiv.style.alignItems = 'center';
// newDiv.style.gap = '0';
newDiv.style.borderRadius = '100%'; //for the circular shape
newDiv.style.position = 'absolute';
newDiv.style.top = '0';
newDiv.style.right = '0';

specialDeal.style.display = 'block';
specialDeal.style.color = 'yellow'; //color for 'special deal'
specialDeal.style.textAlign = 'center';
specialDeal.style.fontSize = '24px';
description.style.display = 'block';
description.style.color = 'white'; //color for description
description.style.textAlign = 'center';

console.log(newDiv);
return newDiv;
};

const handleZoomedElements = () => {
const targetZoomed = document.getElementsByClassName("fancybox-inner");
console.log(targetZoomed);
let zoomedArray = Array.from(targetZoomed);
console.log(zoomedArray);
zoomedArray.forEach((imageLarge) => {
  if (!imageLarge.querySelector('#overlay_wrapper')) {
    imageLarge.style.position = 'relative';
    let overlay = createOverlay();
    imageLarge.appendChild(overlay);
  }
});
};


targetArray.forEach((imageList) => {
imageList.style.position = 'relative';
let overlay = createOverlay();
imageList.appendChild(overlay);

imageList.addEventListener("click", () => {
  // MutationObserver
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.matches && node.matches('.fancybox-image')) {
            handleZoomedElements();
          }
        });
      }
    });
  });

  // observe
  observer.observe(document.body, { childList: true, subtree: true});
  setTimeout(() => observer.disconnect(), 5000);
});
});
};
};
