import { graphql, useStaticQuery } from "gatsby"

export default function useGalleryData() {
  const data = useStaticQuery(graphql`
    query getGalleryData {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              author
              title
              hero_image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
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
