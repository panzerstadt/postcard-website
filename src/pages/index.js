import React, { useState } from "react"
import Layout from "../components/Layout"
import GalleryList from "../components/GalleryList"
import Enlarged from "../components/Enlarged"

export default function IndexPage() {
  const [img, setImg] = useState({})
  const [relativePos, setRelativePos] = useState({ x: 0, y: 0 })
  return (
    <Layout page="home" bgColor="inherit">
      <Enlarged fluid={img} relativePos={relativePos} scale={1.5} />
      <GalleryList onFocusImg={setImg} onMouseMove={setRelativePos} />
    </Layout>
  )
}
