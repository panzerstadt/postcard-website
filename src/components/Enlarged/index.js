import React from "react"
import Img from "gatsby-image"

import styles from "./index.module.css"

const Enlarged = ({ fluid }) => {
  return (
    <div className={styles.container}>{fluid && <Img fluid={fluid} />}</div>
  )
}

export default Enlarged
