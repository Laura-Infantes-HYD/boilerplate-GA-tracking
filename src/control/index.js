import pollForEl from "../common/helpers/pollForEl";
import sendGAEvent from "../common/helpers/sendGAEvent";
import trackingConfig from "../common/tracking/tracking-config.json";

const testName = trackingConfig.testName;
const variation = "control";
const testClassName = `${testName}-${variation}`;

pollForEl("body").then(init);

function init() {
  const testAlreadyLoaded = document.body.classList.contains(testClassName);
  const errorMsg = "Test already loaded";

  if (testAlreadyLoaded) {
    console.warn(errorMsg);
    return;
  }

  window._HYDCRO = { variation };
  sendGAEvent("Test loaded");
  document.body.classList.add(testClassName);
}
