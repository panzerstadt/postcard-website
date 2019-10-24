import React from "react"
import ReactMagnify from "react-image-magnify"

import styles from "./index.module.css"

const GalleryImg = ({ fluid, portalId }) => {
  const { aspectRatio, base64, sizes, src, srcSet } = fluid
  const imgs = {
    smallImage: {
      isFluidWidth: true, // this is automatic
      // height: 300,
      // width: 300, // this works for making images square
      src: src,
      srcSet: srcSet,
    },
    largeImage: {
      src: src,
      srcSet: srcSet,
      width: Math.floor(1000 * aspectRatio),
      height: 1000,
    },
  }

  return (
    <ReactMagnify
      {...imgs}
      className={styles.imgContainer}
      imageClassName={styles.img}
      enlargedImagePortalId={"enlarged-portal" || portalId || undefined}
      enlargedImagePosition="over"
      enlargedImageContainerDimensions={{ width: "150%", height: "150%" }} // affects
      // enlargedImageContainerClassName={styles.largeContainer}
      enlargedImageStyle={{
        position: "absolute",
        // top: "40%",
        height: "100%",
        width: "100%",
        objectFit: "contain",
      }}
      isHintEnabled={false}
      fadeDurationInMs={400}
      hoverDelayInMs={30}
      hoverOffDelayInMs={30}
    />
  )
}

export default GalleryImg
