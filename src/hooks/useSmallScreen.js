import React from "react";

export default function useSmallScreen() {
  const breakpoint = 600;
  const [smallScreen, setSmallScreen] = React.useState(
    window.innerWidth < breakpoint
  );

  React.useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < breakpoint && !smallScreen) setSmallScreen(true);
      else if (window.innerWidth >= breakpoint && smallScreen)
        setSmallScreen(false);
    };
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [smallScreen]);

  return smallScreen;
}
