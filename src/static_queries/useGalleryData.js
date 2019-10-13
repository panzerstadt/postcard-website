import { graphql, useStaticQuery } from "gatsby"

export default function useGalleryData() {
  const data = useStaticQuery(graphql`
    query getGalleryDataFromBlog {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___title }) {
        edges {
          node {
            id
            frontmatter {
              author
              title
              hero_image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    base64
                  }
                }
              }
            }
            excerpt(pruneLength: 200)
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.edges
}
