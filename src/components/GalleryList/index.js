import React, { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Masonry from "react-masonry-css"
import useGalleryData from "../../static_queries/useGalleryData"
import galleryListStyles from "../../styles/components/gallerylist.module.scss"
import Img from "gatsby-image"
import { remap } from "../../libs"

const Indicator = ({ top, left, isVisible, idleSecs = 1 }) => {
  const variants = {
    hidden: { opacity: 0, scale: 0.1, transition: { duration: 0.2 } },
    visible: { opacity: 1, scale: 1 },
  }
  const [show, setShow] = useState(isVisible)
  useEffect(() => {
    if (isVisible && show === false) {
      setShow(true)
    } else if (!isVisible && show === true) {
      setShow(false)
    }

    let t
    t = setTimeout(() => {
      setShow(false)
    }, idleSecs * 1000)

    return () => clearTimeout(t)
  }, [isVisible, top, left])

  return (
    <motion.div
      className={galleryListStyles.hitbox}
      initial={variants.hidden}
      animate={show ? { ...variants.visible, top, left } : variants.hidden}
      style={{
        position: "absolute",
        zIndex: 10000,
        pointerEvents: "none",
        height: 30,
        width: 30,
        marginTop: -15,
        marginLeft: -15,
        borderRadius: 999,
        backgroundColor: "red",
        mixBlendMode: "color-dodge",
      }}
    ></motion.div>
  )
}

const GalleryItem = ({ data, onFocusImg, onMouseMove }) => {
  const imgRef = useRef()
  const [isFocused, setIsFocused] = useState(false)
  useEffect(() => {
    imgRef.current &&
      imgRef.current.addEventListener("mousemove", handleMouseMove)
    return () =>
      imgRef.current &&
      imgRef.current.removeEventListener("mousemove", handleMouseMove)
  }, [imgRef])
  const [pos, setPos] = useState({ x: 0, y: 0 })
  let f

  const handleMouseMove = e => {
    cancelAnimationFrame(f)

    const normalizeMousePos = (pos, size) => {
      const { x, y } = pos
      const { imgX, imgY } = size

      const normalizedX = remap(x, 0, imgX, 0, 1)
      const normalizedY = remap(y, 0, imgY, 0, 1)

      return {
        x: normalizedX,
        y: normalizedY,
      }
    }
    const newPos = { x: e.offsetX, y: e.offsetY }
    const imgSize = { imgX: e.target.width, imgY: e.target.height }

    f = requestAnimationFrame(() => {
      setPos(newPos)
      onMouseMove && onMouseMove(normalizeMousePos(newPos, imgSize))
    })
  }

  const handleFocusImg = () => {
    setIsFocused(true)
    onFocusImg &&
      onFocusImg(data.node.frontmatter.hero_image.childImageSharp.fluid)
  }
  const handleExitFocus = () => {
    const initPos = { x: 0, y: 0 }
    setIsFocused(false)
    onFocusImg && onFocusImg({})
    //setPos(initPos)
    onMouseMove && onMouseMove(initPos)
  }

  return (
    <motion.div
      className={galleryListStyles.galleryItem}
      style={{ position: "relative" }}
      key={data.node.fields.slug}
      initial={{ opacity: 0, outlineColor: "white" }}
      animate={{ opacity: 1 }}
      onHoverStart={() => handleFocusImg()}
      onHoverEnd={() => handleExitFocus()}
      whileHover={{
        scale: 0.85,
        outlineColor: "#ABE8EA",
        outlineWidth: 5,
        outlineStyle: "solid",
        transition: {
          ease: "easeOut",
          duration: 0.3,
        },
      }}
      ref={imgRef}
    >
      <Indicator top={pos.y} left={pos.x} isVisible={isFocused} />
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

export default function GalleryList({ onFocusImg, onMouseMove }) {
  const blogData = useGalleryData()
  function renderBlogData() {
    return blogData
      .filter(blog => blog.node.frontmatter.title !== "")
      .map((data, i) => {
        return (
          <GalleryItem
            key={i}
            data={data}
            onFocusImg={onFocusImg}
            onMouseMove={onMouseMove}
          />
        )
      })
  }

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <section>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={galleryListStyles.masonryContainer}
        columnClassName={galleryListStyles.masonryColumnContainer}
      >
        {renderBlogData()}
      </Masonry>
    </section>
  )
}
