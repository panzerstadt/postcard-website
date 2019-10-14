import React, { useState } from "react"
import Layout from "../components/Layout"
import GalleryList from "../components/GalleryList"
import Enlarged from "../components/Enlarged"

export default function IndexPage() {
  const [img, setImg] = useState({})
  return (
    <Layout page="home" bgColor="inherit">
      {/* <Enlarged fluid={img} /> */}
      <GalleryList onFocusImg={setImg} />
    </Layout>
  )
}
