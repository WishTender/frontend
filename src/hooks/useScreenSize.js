import React from "react";
const getScreenSize = (bp) => {
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  const sortedBreakpointValues = Object.values(bp).sort((a, b) => a - b);
  const screenValue = sortedBreakpointValues.find(
    (c, i) => window.innerWidth < sortedBreakpointValues[i + 1]
  );
  const size = getKeyByValue(bp, screenValue);
  return size;
};
export default function useSmallScreen(options) {
  let bp = options.breakpoints;
  if (options.useStandard) {
    const standard = {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    };
    bp = options.breakpoints || standard;

    if (options.breakpoints) {
      Object.keys(standard).forEach((key) => {
        if (!bp[key]) bp[key] = standard[key];
      });
    }
  }

  const size = getScreenSize(bp);

  const [screenSize, setScreenSize] = React.useState(size);

  React.useEffect(() => {
    const handleWindowResize = () => {
      const sz = getScreenSize(bp);

      if (screenSize !== sz) setScreenSize(sz);
    };
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [bp, screenSize]);

  return screenSize;
}
