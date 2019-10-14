import { useState, useEffect } from "react"

const useDims = () => {
  const [dims, setDims] = useState({})
  const handleResize = () => {
    requestAnimationFrame(() => {
      setDims({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    })
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    setDims({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    return () => window.removeEventListener("resize", handleResize)
  })

  return dims
}

export default useDims
