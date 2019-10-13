import React from "react"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import useGalleryData from "../../static_queries/useGalleryData"
import galleryListStyles from "../../styles/components/gallerylist.module.scss"
import Img from "gatsby-image"

const GalleryItem = ({ data, onFocusImg }) => {
  const handleFocusImg = () => {
    onFocusImg &&
      onFocusImg(data.node.frontmatter.hero_image.childImageSharp.fluid)
  }
  const handleExitFocus = () => {
    onFocusImg && onFocusImg({})
  }
  return (
    <motion.div
      className={galleryListStyles.galleryItem}
      key={data.node.fields.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onHoverStart={() => handleFocusImg()}
      // onHoverEnd={() => handleExitFocus()}
      whileHover={{ opacity: 0.3 }}
    >
      <Img
        fluid={data.node.frontmatter.hero_image.childImageSharp.fluid}
        alt={data.node.frontmatter.title}
      />
      {/* <div className={galleryListStyles.list__info}>
        <h2>{data.node.frontmatter.title}</h2>
      </div> */}
    </motion.div>
  )
}

export default function GalleryList({ onFocusImg }) {
  const blogData = useGalleryData()
  function renderBlogData() {
    return blogData
      .filter(blog => blog.node.frontmatter.title !== "")
      .map(data => {
        return <GalleryItem data={data} onFocusImg={onFocusImg} />
      })
  }
  return (
    <section>
      <div className={galleryListStyles.container}>{renderBlogData()}</div>
    </section>
  )
}
