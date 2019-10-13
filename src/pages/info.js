import React from "react"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import infoStyles from "../styles/pages/info.module.scss"
import useSiteMetaData from "../static_queries/useSiteMetadata"

export default function Info() {
  const { infoData } = useSiteMetaData()
  return (
    <Layout page="info" bgColor={infoData.background_color}>
      <motion.section
        className={infoStyles.info_blurb}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>
          <div dangerouslySetInnerHTML={{ __html: infoData.description }}></div>
          <div dangerouslySetInnerHTML={{ __html: infoData.cta }}></div>
        </h2>
        <ul>
          <li>
            <p>
              <a href={`mailto:${infoData.contact.email}`}>
                Email: {infoData.contact.email}
              </a>
            </p>
          </li>
          <li>
            <p>
              <a
                href={`https://instagram.com/${infoData.contact.instagram_handle}`}
              >
                Instagram: @{infoData.contact.instagram_handle}
              </a>
            </p>
          </li>
        </ul>
      </motion.section>
    </Layout>
  )
}
