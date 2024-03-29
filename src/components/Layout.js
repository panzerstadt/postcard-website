import React, { useEffect } from "react"
import { motion } from "framer-motion"
import Header from "./Header"
import Helmet from "react-helmet"
import useSiteMetadata from "../static_queries/useSiteMetadata"
import layoutStyles from "../styles/components/layout.module.scss"

export default function Layout(props) {
  const { title, description } = useSiteMetadata()
  useEffect(() => {
    // disable right click
    document.oncontextmenu = e => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }, [])
  return (
    <motion.section
      className={`${layoutStyles.layout} ${props.page === "info" &&
        layoutStyles.info_page}`}
      initial={{ backgroundColor: "white" }}
      animate={{ backgroundColor: props.bgColor ? props.bgColor : "white" }}
    >
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header page={props.page} title={title} floating />
      <div className={layoutStyles.content}>{props.children}</div>
    </motion.section>
  )
}
