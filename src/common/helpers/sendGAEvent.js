import trackingConfig from "../tracking/tracking-config.json";
import pollForTrue from "../helpers/pollForTrue";

/**
 * @param {action: string} - event action
 * @param {label: string} - event label (if not especified GA will add "not set")
 * @param {value: number} - event value
 */

const sendGAEvent = (action = "Test loaded", label, value = 0) => {
  pollForTrue(GA_loaded).then(() => {
    sendEvent(action, label, value);
  });
};

const sendEvent = (action, label, value) => {
  const trackers = ga.getAll();
  const { trackingId, customDimension: dimension, testName } = trackingConfig;
  const tracker = trackers.find(
    (tracker) => tracker.get("trackingId") === trackingId
  );

  tracker.set(
    "dimension" + dimension,
    `${testName}-${window._HYDCRO.variation}`
  );

  tracker.send("event", {
    nonInteraction: false,
    eventCategory: "HYD CRO",
    eventAction: action,
    eventLabel: label,
    eventValue: value,
  });
};

const GA_loaded = () => {
  return typeof ga === "function" && ga.loaded;
};

export default sendGAEvent;
