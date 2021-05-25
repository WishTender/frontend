import React, { useState } from "react";

export default function useButtonHeight(button) {
  const [height, setHeight] = useState();

  React.useEffect(() => {
    if (!button) return;
    setHeight(document.documentElement.clientHeight - button.offsetTop);
    console.log(height);
    const handleWindowResize = () => {
      setHeight(document.documentElement.clientHeight - button.offsetTop);
    };
    button.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => button.removeEventListener("resize", handleWindowResize);
  }, [button]);

  return height;
}
