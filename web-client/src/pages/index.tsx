import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {HelloWorld} from 'warhammer-lib'


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
  return (
    <Layout>
      <Seo title="Home" />
        <HelloWorld name="Warhammer Forge"/>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["auto", "webp", "avif"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <ul>
        {data.warApi?.w40kUnits?.map((unit: any) => (
          <li key={unit.id}>
            <Link to={"warhammer4000/units/" + unit.name}>{unit.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default IndexPage
