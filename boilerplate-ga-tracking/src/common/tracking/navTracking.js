import pollForEl from "../helpers/pollForEl";
import { qsa } from "../helpers/querySelectors";
import sendGAEvent from "../helpers/sendGAEvent";

export default () => {
  pollForEl(".main-navigation__list").then(navTracking);
};

const navTracking = () => {
  console.log("navTracking fired");
  const navItems = qsa(".main-navigation__list");

  navItems.forEach((item) =>
    item.addEventListener("click", () => {
      sendGAEvent("nav clicked");
      console.log("nav clicked");
    })
  );
};
