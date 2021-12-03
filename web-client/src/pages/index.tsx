import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query w40kUnits {
      warApi {
        w40kUnits {
          id
          name
        }
      }
    }
  `)
  console.log(data)
  return (
    <Layout>
      <Seo title="Home" />
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      {data.warApi?.w40kUnits?.map((unit: any) => (
        <div key={unit.id}>{unit.name}</div>
      ))}
    </Layout>
  )
}

export default IndexPage
