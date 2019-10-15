import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import useGalleryData from "../../static_queries/useGalleryData"
import galleryListStyles from "../../styles/components/gallerylist.module.scss"
import GalleryImg from "../GalleryImg"
import useDims from "../../hooks/useDims"

const GalleryItem = ({ data, onFocusImg, portalId }) => {
  const imgRef = useRef()

  const handleFocusImg = () => {
    onFocusImg &&
      onFocusImg(data.node.frontmatter.hero_image.childImageSharp.fluid)

    console.log(data.node.frontmatter.hero_image.childImageSharp.fluid)
  }
  const handleExitFocus = () => {
    onFocusImg && onFocusImg({})
  }

  const { aspectRatio } = data.node.frontmatter.hero_image.childImageSharp.fluid

  return (
    <motion.div
      className={galleryListStyles.galleryItem}
      style={{ height: 200 / aspectRatio, width: 200 }}
      key={data.node.fields.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => handleFocusImg()}
      onTap={() => handleFocusImg()}

      // onHoverEnd={() => handleExitFocus()}
      // whileHover={handleHover}
    >
      <GalleryImg
        fluid={data.node.frontmatter.hero_image.childImageSharp.fluid}
        text={data.node.frontmatter.title}
        portalId={portalId}
      />
    </motion.div>
  )
}

export default function GalleryList({ onFocusImg }) {
  const { height, width } = useDims()
  const blogData = useGalleryData()
  function renderBlogData() {
    return blogData
      .filter(blog => blog.node.frontmatter.title !== "")
      .map(data => {
        return (
          <GalleryItem
            data={data}
            onFocusImg={onFocusImg}
            key={data.node.frontmatter.slug}
          />
        )
      })
  }
  return (
    <section>
      <Masonry
        breakpointCols={width > 600 ? 4 : 2}
        className={galleryListStyles.masonryContainer}
        columnClassName={galleryListStyles.masonryColumnContainer}
      >
        {renderBlogData()}
      </Masonry>
    </section>
  )
}
