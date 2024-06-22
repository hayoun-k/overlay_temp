function initializeOverlays() {
  let targetClass = $(".fancybox_listing_link");
  console.log(targetClass);
  let targetArray = targetClass.toArray();
  console.log(targetArray);

  if (targetArray.length > 0) {
    const createOverlay = () => {
      // generating HTML elements for the text overlay
      let newDiv = $("<div>", { id: "overlay_wrapper" });
      let specialDeal = $("<span>").html("Special Deal");
      let description = $("<span>").html("One owner car, Financing Available Low mileage, Call now!");

      newDiv.append(specialDeal).append(description);

      // styling the text and background
      newDiv.css({
        backgroundColor: "red", // background color for box
        width: "200px", // width of entire box
        height: "200px", // height of entire box
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%", // for the circular shape
        position: "absolute",
        top: "0",
        right: "0"
      });

      specialDeal.css({
        display: "block",
        color: "yellow", // color for 'special deal'
        textAlign: "center",
        fontSize: "24px"
      });

      description.css({
        display: "block",
        color: "white", // color for description
        textAlign: "center"
      });

      console.log(newDiv);
      return newDiv;
    };

    const handleZoomedElements = () => {
      const targetZoomed = $(".fancybox-inner");
      console.log(targetZoomed);
      let zoomedArray = targetZoomed.toArray();
      console.log(zoomedArray);
      zoomedArray.forEach((imageLarge) => {
        if (!$(imageLarge).find("#overlay_wrapper").length) {
          $(imageLarge).css("position", "relative");
          let overlay = createOverlay();
          $(imageLarge).append(overlay);
        }
      });
    };

    targetArray.forEach((imageList) => {
      $(imageList).css("position", "relative");
      let overlay = createOverlay();
      $(imageList).append(overlay);

      $(imageList).on("click", () => {
        // MutationObserver
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach((node) => {
                if ($(node).is(".fancybox-image")) {
                  handleZoomedElements();
                }
              });
            }
          });
        });

        // observe
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observer.disconnect(), 5000);
      });
    });
  }
}

// initializeOverlays();
$(window).on("load", initializeOverlays);

