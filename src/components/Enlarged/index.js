import React, { useEffect } from "react"
import { motion } from "framer-motion"
import Img from "gatsby-image"

import styles from "./index.module.css"

const Enlarged = ({ fluid, relativePos, scale = 1 }) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          position: "relative",
          top: `calc(${relativePos.y * scale * -100}% + 50%)`,
          left: `calc(${relativePos.x * scale * -100}% + 50%)`,
          width: `${scale * 100}%`,
        }}
      >
        {fluid && <Img fluid={fluid} />}
      </div>
    </div>
  )
}

export default Enlarged
