import { useEffect, useState, useRef } from "react";

const useDims = (initialData, debounced = true) => {
  const resizeRef = useRef();
  const [height, setHeight] = useState(initialData && initialData.height || 0);
  const [width, setWidth] = useState(initialData && initialData.width || 0);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (debounced) {
      clearTimeout(resizeRef && resizeRef.current);
      resizeRef.current = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }, 250);
    } else {
      requestAnimationFrame(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    }
  };

  return { height: height, width: width };
};

export default useDims;