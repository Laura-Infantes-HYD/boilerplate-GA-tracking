import "./style.scss";
import pollForEl from "../common/helpers/pollForEl";
import _onLoad from "./components/_onLoad";
import pollForTrue from "../common/helpers/pollForTrue";
import qaCookieExists from "../common/helpers/qaCookieExists";
import trackingConfig from "../common/tracking/tracking-config.json";
import sendGAEvent from "../common/helpers/sendGAEvent";

//Add testname to ../common/tracking/tracking-config.json file
//Add testname to ./style.scss
const testName = trackingConfig.testName;
const variation = "v1";
const testClassName = `${testName}-${variation}`;

// Uncomment the following line to run peview links:
// pollForTrue(()=>{return qaCookieExists(testName)}).then(()=>{pollForEl('body').then(init)})

// Comment the following line to run peview links:
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

  _onLoad();
}
