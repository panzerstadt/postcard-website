import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Img from "gatsby-image"

import styles from "./index.module.css"

const Enlarged = ({ fluid, relativePos, scale = 1 }) => {
  const [isShowing, setIsShowing] = useState(false)
  useEffect(() => {
    if ("base64" in fluid && isShowing === false) {
      setIsShowing(true)
    } else if (isShowing === true) {
      setIsShowing(false)
    }

    return () => setIsShowing(false)
  }, [fluid])

  const variants = {
    hidden: { opacity: 0, transition: { duration: 0.5 } },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  return (
    <div className={styles.container}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isShowing ? "visible" : "hidden"}
        style={{
          position: "relative",
          top: `calc(${relativePos.y * scale * -100}% + 50%)`,
          left: `calc(${relativePos.x * scale * -100}% + 50%)`,
          width: `${scale * 100}%`,
        }}
      >
        {isShowing && <Img fluid={fluid} />}
      </motion.div>
    </div>
  )
}

export default Enlarged
