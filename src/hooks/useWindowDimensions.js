import { useState, useEffect } from "react";

function getWindowDimensions() {
  const isBrowser = typeof window !== "undefined";
  if (!isBrowser) {
    return { width: 0, height: 0 };
  } else if (isBrowser) {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
  }, [window]);

  return windowDimensions;
}
